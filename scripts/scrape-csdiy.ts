/**
 * csdiy.wiki 内容抓取脚本
 *
 * 1. 遍历 sitemap.xml 获取所有页面URL
 * 2. 下载每个页面的内容
 * 3. 提取结构化数据
 * 4. 保存为 JSON
 *
 * 用法: npx tsx scripts/scrape-csdiy.ts
 */
import * as fs from "fs"
import * as path from "path"

const BASE_URL = "https://csdiy.wiki"
const OUTPUT_DIR = path.join(__dirname, "..", "data", "scraped")

interface PageData {
  url: string
  title: string
  content: string
  category: string
  course: string | null
}

async function fetchWithRetry(url: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)
      if (res.ok) return await res.text()
      console.warn(`  HTTP ${res.status} for ${url}`)
    } catch (e: unknown) {
      const err = e as Error
      if (i < retries - 1) {
        console.warn(`  Retry ${i + 1}/${retries} for ${url}: ${err.message}`)
        await new Promise((r) => setTimeout(r, 2000 * (i + 1)))
      } else {
        console.error(`  Failed ${url}: ${err.message}`)
      }
    }
  }
  return ""
}

function extractTitle(html: string): string {
  const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/)
  return match ? match[1].trim() : ""
}

function extractContent(html: string): string {
  // Remove scripts, styles, nav
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
  text = text.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
  // Extract main content area
  const mainMatch = text.match(/<article[^>]*>[\s\S]*?<\/article>/i) ||
                    text.match(/<main[^>]*>[\s\S]*?<\/main>/i) ||
                    text.match(/<div class="md-content"[^>]*>[\s\S]*?<\/div>/i)
  if (mainMatch) text = mainMatch[0]
  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, "\n")
  // Decode HTML entities
  text = text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  // Clean up whitespace
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
  return lines.join("\n").slice(0, 10000) // Limit content length
}

async function main() {
  console.log("🔍 开始抓取 csdiy.wiki...")
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // 1. Fetch sitemap
  console.log("📄 获取 sitemap...")
  const sitemapXml = await fetchWithRetry(`${BASE_URL}/sitemap.xml`)
  if (!sitemapXml) {
    console.error("❌ 无法获取 sitemap")
    return
  }

  // 2. Extract URLs (only Chinese pages, skip /en/)
  const urlRegex = /<loc>(https:\/\/csdiy\.wiki[^<]+)<\/loc>/g
  const urls: string[] = []
  let m
  while ((m = urlRegex.exec(sitemapXml)) !== null) {
    const url = m[1]
    if (!url.includes("/en/")) urls.push(url)
  }
  console.log(`📋 找到 ${urls.length} 个页面`)

  // 3. Fetch each page
  const allPages: PageData[] = []
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    process.stdout.write(`\r  [${i + 1}/${urls.length}] ${url.replace(BASE_URL, "")}`)
    const html = await fetchWithRetry(url)
    if (!html) continue

    const pathParts = url.replace(BASE_URL, "").split("/").filter(Boolean)
    const page: PageData = {
      url,
      title: extractTitle(html),
      content: extractContent(html),
      category: decodeURIComponent(pathParts[0] || ""),
      course: decodeURIComponent(pathParts[1] || ""),
    }
    allPages.push(page)
  }
  console.log("\n")

  // 4. Save to JSON
  const outputPath = path.join(OUTPUT_DIR, "csdiy-pages.json")
  fs.writeFileSync(outputPath, JSON.stringify(allPages, null, 2), "utf-8")
  console.log(`✅ 已保存 ${allPages.length} 个页面到 ${outputPath}`)

  // 5. Also save a summary
  const categories = [...new Set(allPages.filter((p) => p.course).map((p) => p.category))]
  const courses = [...new Set(allPages.filter((p) => p.course && p.course !== p.category).map((p) => ({ category: p.category, name: p.course })))]
  console.log(`\n📊 统计:`)
  console.log(`  - ${categories.length} 个分类`)
  console.log(`  - ${courses.length} 个课程`)
}

main().catch(console.error)
