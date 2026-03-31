import os
import shutil
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_gradient_overlay(width, height):
    # Create a dark gradient overlay from bottom to top
    overlay = Image.new('RGBA', (width, height), color=(0,0,0,0))
    draw = ImageDraw.Draw(overlay)
    
    # Bottom 50% gets a gradient fading into black
    fade_start = height // 2
    for y in range(fade_start, height):
        # alpha goes from 0 to 220
        alpha = int(220 * ((y - fade_start) / (height - fade_start)))
        draw.line([(0, y), (width, y)], fill=(5,5,5, alpha))
        
    return overlay

def generate_ad(image_path, out_path, size, cta_text, tagline_text):
    print(f"Generating {os.path.basename(out_path)}...")
    img = Image.open(image_path).convert("RGBA")
    
    # 1. Image cover crop (zoom to fill)
    img_aspect = img.width / img.height
    target_aspect = size[0] / size[1]
    
    if img_aspect > target_aspect:
        # Image is wider than target
        new_width = int(img.height * target_aspect)
        offset = (img.width - new_width) // 2
        img = img.crop((offset, 0, offset + new_width, img.height))
    else:
        # Image is taller than target
        new_height = int(img.width / target_aspect)
        offset = (img.height - new_height) // 2
        img = img.crop((0, offset, img.width, offset + new_height))
        
    img = img.resize(size, Image.Resampling.LANCZOS)
    
    # 2. Gradient Overlay for Text
    gradient = create_gradient_overlay(size[0], size[1])
    img = Image.alpha_composite(img, gradient)
    
    # 3. Typography
    draw = ImageDraw.Draw(img)
    
    # Try finding standard windows fonts
    try:
        font_title = ImageFont.truetype("georgiab.ttf", int(size[0] * 0.08))
        font_tagline = ImageFont.truetype("georgiai.ttf", int(size[0] * 0.045))
        font_cta = ImageFont.truetype("arialbd.ttf", int(size[0] * 0.035))
    except (IOError, OSError):
        font_title = ImageFont.load_default()
        font_tagline = ImageFont.load_default()
        font_cta = ImageFont.load_default()

    # The Fat Chef Logo/Title
    title = "THE FAT CHEF"
    bbox = draw.textbbox((0, 0), title, font=font_title)
    w = bbox[2] - bbox[0]
    draw.text(((size[0] - w)/2, size[1] * 0.65), title, font=font_title, fill=(212,175,55)) # Gold
    
    # Tagline
    bbox_tagline = draw.textbbox((0, 0), tagline_text, font=font_tagline)
    w_t = bbox_tagline[2] - bbox_tagline[0]
    draw.text(((size[0] - w_t)/2, size[1] * 0.76), tagline_text, font=font_tagline, fill=(240,240,240))
    
    # CTA Button (Outline)
    cta_w, cta_h = size[0] * 0.4, size[1] * 0.06
    cta_x = (size[0] - cta_w)/2
    cta_y = size[1] * 0.85
    
    draw.rectangle([cta_x, cta_y, cta_x + cta_w, cta_y + cta_h], outline=(212,175,55), width=3)
    
    bbox_cta = draw.textbbox((0, 0), cta_text, font=font_cta)
    w_c = bbox_cta[2] - bbox_cta[0]
    h_c = bbox_cta[3] - bbox_cta[1]
    draw.text((cta_x + (cta_w - w_c)/2, cta_y + (cta_h - h_c)/2 - 5), cta_text, font=font_cta, fill=(212,175,55))
    
    img = img.convert("RGB")
    img.save(out_path, quality=95)

if __name__ == "__main__":
    base_dir = r"C:\Users\noahb\.gemini\antigravity\scratch\fat-chef-web\public\post-pics"
    art_dir = r"C:\Users\noahb\.gemini\antigravity\brain\69e10195-b27c-4418-ad94-2f2936990bd2"
    
    ads_to_generate = [
        ("beef-wellington.jpg", "fat_chef_ad_1_square.jpg", (1080, 1080), "BOOK A TABLE", "Elevate Your Evening"),
        ("steak-with-potato-and-green-beans.jpg", "fat_chef_ad_2_portrait.jpg", (1080, 1350), "RESERVE TODAY", "NWA's Premier Steakhouse"),
        ("candle-red-ambiance-muted.jpg", "fat_chef_ad_3_story.jpg", (1080, 1920), "VIEW MENU", "Only 3 Miles from Downtown")
    ]
    
    for filename, out_name, size, cta, tagline in ads_to_generate:
        in_path = os.path.join(base_dir, filename)
        out_path = os.path.join(art_dir, out_name)
        if os.path.exists(in_path):
            generate_ad(in_path, out_path, size, cta, tagline)
        else:
            print(f"File not found: {in_path}")
