// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks.classList.contains("responsive")) {
        navLinks.classList.remove("responsive");
    } else {
        navLinks.classList.add("responsive");
    }
    
    // Also toggle sidebar on mobile
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("responsive")) {
        sidebar.classList.remove("responsive");
    } else {
        sidebar.classList.add("responsive");
    }
}

// Highlight active sidebar link based on scroll position
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    
    if (sections.length === 0 || sidebarLinks.length === 0) return;
    
    window.addEventListener("scroll", function() {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
    
    // Add smooth scrolling to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            // Only apply to hash links on the same page
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                
                const targetId = this.getAttribute("href");
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: "smooth"
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                    
                    // Close mobile menu if open
                    const navLinks = document.getElementById("navLinks");
                    if (navLinks.classList.contains("responsive")) {
                        toggleMenu();
                    }
                }
            }
        });
    });
});

// Add syntax highlighting to code blocks
document.addEventListener("DOMContentLoaded", function() {
    const codeBlocks = document.querySelectorAll("pre code");
    
    codeBlocks.forEach(block => {
        // Simple syntax highlighting
        const code = block.innerHTML;
        
        // Highlight keywords
        const keywords = ["function", "const", "let", "var", "return", "if", "else", "for", "while", "class", "constructor", "this", "new", "import", "export", "from", "true", "false", "null", "undefined"];
        
        let highlightedCode = code;
        
        // Highlight keywords
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, "g");
            highlightedCode = highlightedCode.replace(regex, `<span style="color: #0000ff;">${keyword}</span>`);
        });
        
        // Highlight strings
        highlightedCode = highlightedCode.replace(/(["'])(.*?)\1/g, '<span style="color: #a31515;">$&</span>');
        
        // Highlight comments
        highlightedCode = highlightedCode.replace(/(\/\/.*)/g, '<span style="color: #008000;">$1</span>');
        
        block.innerHTML = highlightedCode;
    });
});