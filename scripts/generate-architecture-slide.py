"""Generates a single PowerPoint slide showing the prototype -> GitHub -> Railway -> GOV.UK deployment architecture."""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.oxml.ns import qn

GOVUK_BLUE = RGBColor(0x1D, 0x70, 0xB8)
GOVUK_BLACK = RGBColor(0x0B, 0x0C, 0x0C)
GOVUK_GREEN = RGBColor(0x00, 0x70, 0x3C)
GOVUK_GREY = RGBColor(0xF3, 0xF2, 0xF1)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
GITHUB_DARK = RGBColor(0x24, 0x29, 0x2E)
RAILWAY_PURPLE = RGBColor(0x6B, 0x46, 0xC1)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank layout

# Title
title_box = slide.shapes.add_textbox(Inches(0.4), Inches(0.25), Inches(12.5), Inches(0.7))
tf = title_box.text_frame
p = tf.paragraphs[0]
run = p.add_run()
run.text = "Prototype Deployment Architecture: Local Build \u2192 GitHub \u2192 Railway \u2192 GOV.UK"
run.font.size = Pt(26)
run.font.bold = True
run.font.color.rgb = GOVUK_BLACK

def add_box(left, top, width, height, text, fill_color, font_color=WHITE, font_size=13, shape=MSO_SHAPE.ROUNDED_RECTANGLE):
    box = slide.shapes.add_shape(shape, left, top, width, height)
    box.fill.solid()
    box.fill.fore_color.rgb = fill_color
    box.line.color.rgb = fill_color
    box.shadow.inherit = False
    tf = box.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = Pt(6)
    tf.margin_right = Pt(6)
    lines = text.split("\n")
    for i, line in enumerate(lines):
        para = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        para.alignment = PP_ALIGN.CENTER
        r = para.add_run()
        r.text = line
        r.font.size = Pt(font_size if i == 0 else font_size - 2)
        r.font.bold = (i == 0)
        r.font.color.rgb = font_color
    return box

def add_arrow(start_shape, end_shape, label=None):
    connector = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, 0, 0, 0, 0)
    connector.begin_connect(start_shape, 3)
    connector.end_connect(end_shape, 1)
    connector.line.color.rgb = GOVUK_BLACK
    connector.line.width = Pt(2)
    # arrowhead
    ln = connector.line._get_or_add_ln()
    tail = ln.makeelement(qn('a:tailEnd'), {'type': 'triangle', 'w': 'med', 'len': 'med'})
    ln.append(tail)
    if label:
        lbl_box = slide.shapes.add_textbox(
            Emu(min(start_shape.left + start_shape.width, end_shape.left) - Emu(int(0.1 * 914400))),
            Emu(start_shape.top - int(0.32 * 914400)),
            Emu(int(1.6 * 914400)), Emu(int(0.5 * 914400))
        )
        tf = lbl_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = label
        r.font.size = Pt(10)
        r.font.italic = True
        r.font.color.rgb = GOVUK_BLACK
    return connector

top_row = Inches(1.3)
box_h = Inches(1.6)
box_w = Inches(2.5)
gap = Inches(0.55)

x1 = Inches(0.4)
x2 = x1 + box_w + gap
x3 = x2 + box_w + gap
x4 = x3 + box_w + gap
x5 = x4 + box_w + gap

b1 = add_box(x1, top_row, box_w, box_h,
             "Local Prototype\n(VS Code + Node.js)\nGOV.UK Prototype Kit\nBuild pages, edit content",
             GOVUK_BLUE)
b2 = add_box(x2, top_row, box_w, box_h,
             "Git Commit & Push\ngit add / commit / push\nfrom local branch",
             GOVUK_GREY, font_color=GOVUK_BLACK)
b3 = add_box(x3, top_row, box_w, box_h,
             "GitHub Repository\nRemote source of truth\nPull Requests & Code Review\nMerge to main branch",
             GITHUB_DARK)
b4 = add_box(x4, top_row, box_w, box_h,
             "Railway\nWebhook triggers build\nInstalls deps & runs\nnpm start, deploys container",
             RAILWAY_PURPLE)
b5 = add_box(x5, top_row, box_w, box_h,
             "Live GOV.UK Prototype\nPublic Railway URL\nViewed by users/\nstakeholders in browser",
             GOVUK_GREEN)

add_arrow(b1, b2, "push")
add_arrow(b2, b3, "GitHub\nreceives commit")
add_arrow(b3, b4, "webhook\non merge")
add_arrow(b4, b5, "deploy")

# Feedback loop arrow (bottom, from GitHub PR review back to local)
loop_top = Inches(3.4)
loop_box = add_box(x1, loop_top, box_w * 4 + gap * 3, Inches(0.9),
                    "Feedback loop: reviewers/stakeholders raise issues in GitHub (PR comments / Issues) \u2192 developer pulls latest, edits locally, pushes again",
                    GOVUK_GREY, font_color=GOVUK_BLACK, font_size=13, shape=MSO_SHAPE.ROUNDED_RECTANGLE)

# Notes / caption box at bottom
note_box = slide.shapes.add_textbox(Inches(0.4), Inches(4.7), Inches(12.5), Inches(2.4))
tf = note_box.text_frame
tf.word_wrap = True
lines = [
    ("Key transactions:", True, 15),
    ("1. Developer edits prototype locally using Node.js and the GOV.UK Prototype Kit, previewing changes at localhost.", False, 13),
    ("2. Changes are committed and pushed to a GitHub repository; pull requests enable review before merging to the main branch.", False, 13),
    ("3. GitHub triggers a webhook to Railway on merge/push, which automatically builds and deploys the app.", False, 13),
    ("4. Railway hosts the running prototype and exposes a public URL that mirrors how the service would appear on GOV.UK.", False, 13),
    ("5. Stakeholders view the deployed prototype in a browser and give feedback via GitHub Issues or PR comments, restarting the cycle.", False, 13),
]
for i, (text, bold, size) in enumerate(lines):
    p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
    r = p.add_run()
    r.text = text
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.color.rgb = GOVUK_BLACK

out_path = r"c:\Users\pc1bl\OneDrive\Documents\GCA\Prototype\prototype-architecture.pptx"
prs.save(out_path)
print(f"Saved: {out_path}")
