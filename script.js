// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks")
  navLinks.classList.toggle("responsive")

  // Also toggle sidebar on mobile
  const sidebar = document.querySelector(".sidebar")
  if (sidebar) {
    sidebar.classList.toggle("responsive")
  }
}

// Highlight active sidebar link based on scroll position
document.addEventListener("DOMContentLoaded", () => {
  // Handle mobile menu toggle
  const menuIcon = document.querySelector(".icon")
  if (menuIcon) {
    menuIcon.addEventListener("click", toggleMenu)
  }

  const sections = document.querySelectorAll("section")
  const sidebarLinks = document.querySelectorAll(".sidebar a")

  if (sections.length === 0 || sidebarLinks.length === 0) return

  // Set initial active state based on URL hash or first section
  setActiveSidebarLink()

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    setActiveSidebarLink()
  })

  // Add smooth scrolling to sidebar links
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only apply to hash links on the same page
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          })

          // Update URL without page reload
          history.pushState(null, null, targetId)

          // Close mobile menu if open
          const navLinks = document.getElementById("navLinks")
          if (navLinks && navLinks.classList.contains("responsive")) {
            toggleMenu()
          }
        }
      }
    })
  })

  // Set active link in topnav based on current page
  setActiveNavLink()
})

// Function to set active sidebar link based on scroll position
function setActiveSidebarLink() {
  const sections = document.querySelectorAll("section")
  const sidebarLinks = document.querySelectorAll(".sidebar a")

  if (sections.length === 0 || sidebarLinks.length === 0) return

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  sidebarLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === `#${current}` || (current === "" && href.includes(window.location.pathname.split("/").pop()))) {
      link.classList.add("active")
    }
  })
}

// Function to set active link in top navigation based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-links a")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
}

// Add syntax highlighting to code blocks
document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll("pre code")

  codeBlocks.forEach((block) => {
    // Simple syntax highlighting
    const code = block.innerHTML

    // Highlight keywords
    const keywords = [
      "function",
      "const",
      "let",
      "var",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "constructor",
      "this",
      "new",
      "import",
      "export",
      "from",
      "true",
      "false",
      "null",
      "undefined",
    ]

    let highlightedCode = code

    // Highlight keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g")
      highlightedCode = highlightedCode.replace(regex, `<span style="color: #0000ff;">${keyword}</span>`)
    })

    // Highlight strings
    highlightedCode = highlightedCode.replace(/(["'])(.*?)\1/g, '<span style="color: #a31515;">$&</span>')

    // Highlight comments
    highlightedCode = highlightedCode.replace(/(\/\/.*)/g, '<span style="color: #008000;">$1</span>')

    block.innerHTML = highlightedCode
  })
})
