/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"RAJRyPH6stt22x5C","label":"reddit","bookmarks":[{"id":"8p2tfElZjMRRT5XH","label":"r/archlinux","url":"https://www.reddit.com/r/archlinux/"},{"id":"nppwx7oS0HyLLaML","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"7LDBpUq9Tl0VbrSC","label":"dev tools","bookmarks":[{"id":"Yx8sUz9vrf5ckfky","label":"github","url":"https://github.com/VinoLemos"},{"id":"jjjmLtq7oXaAFTbN","label":"udemy","url":"https://www.udemy.com/"}]},{"id":"h51rABS6PcvgaEQq","label":"worth reading","bookmarks":[{"id":"8kFsrb59DaQW5Ksx","label":"Quora","url":"quora.com/"}]},{"id":"N7aP82BcmOv74gwL","label":"learn","bookmarks":[{"id":"Q7bVO1ftL7P7JTcz","label":"Ms Teams","url":"https://teams.microsoft.com/"},{"id":"Qn7uPSkfBSxfMLei","label":"Ms Learn","url":"https://docs.microsoft.com/en-us/learn/"},{"id":"DZZeVYyr6oeQRR94","label":"Fundação Fat","url":"https://ensino.fundacaofat.org.br/"},{"id":"FHu9fua3xovj8TAo","label":"Cisco Networking Academy","url":"https://www.netacad.com/pt-br"}]},{"id":"MGJcqEwHKr4d5ym3","label":"personal","bookmarks":[{"id":"3LJlT6sV4saS3GBF","label":"Email","url":"gmail.com"},{"id":"bh4r8QBWdgMXiDpH","label":"youtube","url":"https://youtube.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
