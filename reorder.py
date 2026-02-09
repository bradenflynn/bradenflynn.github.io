#!/usr/bin/env python3
import re

# Read the HTML file
with open('/Users/bradenflynn/Desktop/Cursor test/index.html', 'r') as f:
    content = f.read()

# Find the Skills section (lines 78-117)
skills_pattern = r'(\s+<!-- Skills Section -->.*?</section>)\s+'
skills_match = re.search(skills_pattern, content, re.DOTALL)
skills_section = skills_match.group(1) if skills_match else ""

# Find the Projects section (lines 119-172)
projects_pattern = r'(\s+<!-- Projects Section -->.*?(?=\s+<!-- Contact Section -->))'
projects_match = re.search(projects_pattern, content, re.DOTALL)
projects_section = projects_match.group(1) if projects_match else ""

# Remove both sections from content
content_without = re.sub(skills_pattern, '', content, flags=re.DOTALL)
content_without = re.sub(projects_pattern, '', content_without, flags=re.DOTALL)

# Find where to insert (after About section, before Contact)
about_end = content_without.find('</section>', content_without.find('<!-- About Section -->'))
insert_pos = content_without.find('\n', about_end) + 1

# Insert projects first, then skills
new_content = content_without[:insert_pos] + '\n' + projects_section + '\n' + skills_section + '\n' + content_without[insert_pos:]

# Add scroll progress indicator before </body>
scroll_indicator = '''    <!-- Scroll Progress Indicator -->
    <div class="scroll-progress">
        <svg class="scroll-progress-ring" width="50" height="50">
            <circle class="scroll-progress-circle" cx="25" cy="25" r="20"></circle>
        </svg>
    </div>

'''
new_content = new_content.replace('    <script src="script.js"></script>', scroll_indicator + '    <script src="script.js"></script>')

# Write back
with open('/Users/bradenflynn/Desktop/Cursor test/index.html', 'w') as f:
    f.write(new_content)

print("Reordered sections: Projects now before Skills, added scroll progress indicator")
