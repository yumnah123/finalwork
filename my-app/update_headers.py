#!/usr/bin/env python3
import os
import re

# Pages to update with their active sections
pages = {
    'feedback': 'FEEDBACK',
    'corporate': 'CORPORATE ACCOUNT',
    'contact': 'CONTACT'
}

for page, active_section in pages.items():
    file_path = f'app/{page}/page.tsx'

    if not os.path.exists(file_path):
        print(f"File {file_path} does not exist, skipping...")
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove unnecessary imports
    content = re.sub(r'import.*?Phone.*?from "lucide-react";', '', content)
    content = re.sub(r'import.*?Menu.*?from "lucide-react";', '', content)
    content = re.sub(r'import.*?X.*?from "lucide-react";', '', content)
    content = re.sub(r'import.*?logo.*?from.*?Logo.svg";', '', content)

    # Add Header import
    if 'import Header from' not in content:
        content = re.sub(r'import Footer from.*?Footer";', r'import Footer from "../../components/Footer";\nimport Header from "../../components/Header";', content)

    # Remove state variables
    content = re.sub(r'const \[isScrolled, setIsScrolled\] = useState\(false\);', '', content)
    content = re.sub(r'const \[isMobileMenuOpen, setIsMobileMenuOpen\] = useState\(false\);', '', content)
    content = re.sub(r'const \[activeSection, setActiveSection\] = useState\(.*?\);', '', content)

    # Remove useEffect hooks
    content = re.sub(r'useEffect\(\(\) => \{.*?handleScroll.*?\}, \[isMobileMenuOpen\]\);', '', content, flags=re.DOTALL)
    content = re.sub(r'useEffect\(\(\) => \{.*?handleClickOutside.*?\}, \[isMobileMenuOpen\]\);', '', content, flags=re.DOTALL)

    # Replace header section
    header_pattern = r'<header.*?</header>'
    replacement = f'<Header activeSection="{active_section}" />'
    content = re.sub(header_pattern, replacement, content, flags=re.DOTALL)

    # Clean up extra whitespace
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Updated {file_path}")

print("Header update script completed!")