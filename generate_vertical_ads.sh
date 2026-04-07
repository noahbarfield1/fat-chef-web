#!/bin/bash
# Generate 9:16 (1080x1920) vertical social ads for The Fat Chef
# Uses the same base images and branding as the square versions

PICS="C:/Users/noahb/.gemini/antigravity/scratch/fat-chef-web/public/post-pics"
OUT="C:/Users/noahb/Downloads/Work"
FONT_SERIF="C:/Windows/Fonts/georgiab.ttf"
FONT_SERIF_I="C:/Windows/Fonts/georgiai.ttf"
FONT_SANS="C:/Windows/Fonts/arialbd.ttf"
FONT_SCRIPT="C:/Windows/Fonts/gabriola.ttf"

# Colors (FFmpeg format)
GOLD="0xC5A059"
CREAM="0xF0EBE1"
BLACK="0x070707"
WHITE="0xFFFFFF"

# =========================================================================
# AD 1 — HERO (Steak) — "Premium Cuts. Masterful Cooking."
# =========================================================================
echo "=== Generating Hero Ad (9:16) ==="
ffmpeg -y -loop 1 -i "$PICS/steak-with-potato-and-green-beans.jpg" \
  -filter_complex "
    [0:v]scale=2160:3840,crop=1080:1920:(iw-1080)/2:(ih-1920)/2,
    zoompan=z='min(zoom+0.0003,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1080x1920:fps=24,
    format=yuva420p,
    drawbox=y=ih*0.35:w=iw:h=ih*0.65:color=black@0.45:t=fill,
    drawtext=fontfile=$FONT_SANS:text='HAND-CUT PRIME RIBEYE':fontcolor=$GOLD:fontsize=22:x=(w-tw)/2:y=h*0.38:alpha='if(lt(t,0.8),0,min((t-0.8)/0.4,1))',
    drawtext=fontfile=$FONT_SERIF:text='Premium Cuts.':fontcolor=$CREAM:fontsize=72:x=(w-tw)/2:y=h*0.42:alpha='if(lt(t,1.0),0,min((t-1.0)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Masterful':fontcolor=$CREAM:fontsize=72:x=(w-tw)/2:y=h*0.485:alpha='if(lt(t,1.2),0,min((t-1.2)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Cooking.':fontcolor=$GOLD:fontsize=72:x=(w-tw)/2:y=h*0.55:alpha='if(lt(t,1.4),0,min((t-1.4)/0.5,1))',
    drawtext=fontfile=$FONT_SANS:text='EXPERIENCE FLAWLESSLY EXECUTED STEAKS.':fontcolor=$CREAM@0.7:fontsize=18:x=(w-tw)/2:y=h*0.63:alpha='if(lt(t,2.0),0,min((t-2.0)/0.5,1))',
    drawbox=x=(w-300)/2:y=h*0.68:w=300:h=56:color=$GOLD:t=3:alpha='if(lt(t,2.5),0,min((t-2.5)/0.4,1))',
    drawtext=fontfile=$FONT_SANS:text='LOCATE US':fontcolor=$GOLD:fontsize=22:x=(w-tw)/2:y=h*0.695:alpha='if(lt(t,2.5),0,min((t-2.5)/0.4,1))',
    drawtext=fontfile=$FONT_SERIF:text='The':fontcolor=$CREAM@0.6:fontsize=28:x=w*0.08:y=h*0.82:alpha='if(lt(t,3.0),0,min((t-3.0)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Fat Chef':fontcolor=$CREAM:fontsize=64:x=w*0.06:y=h*0.845:alpha='if(lt(t,3.2),0,min((t-3.2)/0.5,1))',
    drawtext=fontfile=$FONT_SCRIPT:text='Never Trust A Skinny Chef!':fontcolor=$GOLD:fontsize=32:x=w*0.08:y=h*0.91:alpha='if(lt(t,3.4),0,min((t-3.4)/0.5,1))'
  " \
  -t 10 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart \
  "$OUT/Vertical_Ad_Hero.mp4"

# =========================================================================
# AD 2 — SEAFOOD — "Fresh Catch, Flawless Flavor."
# =========================================================================
echo "=== Generating Seafood Ad (9:16) ==="
ffmpeg -y -loop 1 -i "$PICS/seafood-pasta-1.jpg" \
  -filter_complex "
    [0:v]scale=2160:3840,crop=1080:1920:(iw-1080)/2:(ih-1920)/2,
    zoompan=z='min(zoom+0.0003,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1080x1920:fps=24,
    format=yuva420p,
    drawbox=y=0:w=iw:h=ih*0.12:color=black@0.5:t=fill,
    drawbox=y=ih*0.40:w=iw:h=ih*0.60:color=black@0.45:t=fill,
    drawbox=x=(w-280)/2:y=h*0.05:w=280:h=40:color=$GOLD:t=fill,
    drawtext=fontfile=$FONT_SANS:text='SIGNATURE DISH':fontcolor=$BLACK:fontsize=20:x=(w-tw)/2:y=h*0.058:alpha='if(lt(t,0.5),0,min((t-0.5)/0.4,1))',
    drawtext=fontfile=$FONT_SANS:text='FRESH SEAFOOD LINGUINE':fontcolor=$GOLD:fontsize=20:x=(w-tw)/2:y=h*0.42:alpha='if(lt(t,0.8),0,min((t-0.8)/0.4,1))',
    drawtext=fontfile=$FONT_SERIF:text='Fresh Catch,':fontcolor=$CREAM:fontsize=72:x=(w-tw)/2:y=h*0.45:alpha='if(lt(t,1.0),0,min((t-1.0)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Flawless':fontcolor=$CREAM:fontsize=72:x=(w-tw)/2:y=h*0.515:alpha='if(lt(t,1.2),0,min((t-1.2)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Flavor.':fontcolor=$GOLD:fontsize=72:x=(w-tw)/2:y=h*0.58:alpha='if(lt(t,1.4),0,min((t-1.4)/0.5,1))',
    drawbox=x=(w-340)/2:y=h*0.66:w=340:h=56:color=$GOLD:t=fill,
    drawtext=fontfile=$FONT_SANS:text='BOOK YOUR TABLE':fontcolor=$BLACK:fontsize=22:x=(w-tw)/2:y=h*0.675:alpha='if(lt(t,2.2),0,min((t-2.2)/0.4,1))',
    drawtext=fontfile=$FONT_SERIF:text='The':fontcolor=$CREAM@0.6:fontsize=28:x=w*0.28:y=h*0.76:alpha='if(lt(t,3.0),0,min((t-3.0)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Fat Chef':fontcolor=$CREAM:fontsize=64:x=w*0.22:y=h*0.785:alpha='if(lt(t,3.2),0,min((t-3.2)/0.5,1))',
    drawtext=fontfile=$FONT_SCRIPT:text='Never Trust A Skinny Chef!':fontcolor=$GOLD:fontsize=32:x=(w-tw)/2:y=h*0.855:alpha='if(lt(t,3.4),0,min((t-3.4)/0.5,1))'
  " \
  -t 10 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart \
  "$OUT/Vertical_Ad_Seafood.mp4"

# =========================================================================
# AD 3 — BIRTHDAY (Crème Brûlée) — "Celebrate In Style."
# =========================================================================
echo "=== Generating Birthday Ad (9:16) ==="
ffmpeg -y -loop 1 -i "$PICS/creme-brulee.jpg" \
  -filter_complex "
    [0:v]scale=2160:3840,crop=1080:1920:(iw-1080)/2:(ih-1920)/2,
    zoompan=z='min(zoom+0.0003,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1080x1920:fps=24,
    format=yuva420p,
    drawbox=y=0:w=iw:h=ih*0.18:color=black@0.5:t=fill,
    drawbox=y=ih*0.50:w=iw:h=ih*0.50:color=black@0.45:t=fill,
    drawtext=fontfile=$FONT_SERIF:text='The':fontcolor=$CREAM@0.6:fontsize=28:x=(w-tw)/2-110:y=h*0.03:alpha='if(lt(t,0.5),0,min((t-0.5)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Fat Chef':fontcolor=$CREAM:fontsize=72:x=(w-tw)/2:y=h*0.05:alpha='if(lt(t,0.7),0,min((t-0.7)/0.5,1))',
    drawtext=fontfile=$FONT_SCRIPT:text='Never Trust A Skinny Chef!':fontcolor=$GOLD:fontsize=32:x=(w-tw)/2:y=h*0.115:alpha='if(lt(t,0.9),0,min((t-0.9)/0.5,1))',
    drawbox=x=(w-300)/2:y=h*0.155:w=300:h=40:color=$GOLD:t=fill,
    drawtext=fontfile=$FONT_SANS:text='THE PERFECT ENDING':fontcolor=$BLACK:fontsize=18:x=(w-tw)/2:y=h*0.163:alpha='if(lt(t,1.2),0,min((t-1.2)/0.4,1))',
    drawtext=fontfile=$FONT_SANS:text='HOUSE-MADE CRÈME BRÛLÉE':fontcolor=$CREAM@0.5:fontsize=18:x=(w-tw)/2:y=h*0.52:alpha='if(lt(t,2.0),0,min((t-2.0)/0.4,1))',
    drawtext=fontfile=$FONT_SERIF:text='Celebrate In':fontcolor=$CREAM:fontsize=72:x=w*0.06:y=h*0.55:alpha='if(lt(t,2.2),0,min((t-2.2)/0.5,1))',
    drawtext=fontfile=$FONT_SERIF:text='Style.':fontcolor=$GOLD:fontsize=72:x=w*0.06:y=h*0.615:alpha='if(lt(t,2.4),0,min((t-2.4)/0.5,1))',
    drawtext=fontfile=$FONT_SANS:text='MAKE YOUR EVENING TRULY UNFORGETTABLE.':fontcolor=$CREAM@0.7:fontsize=18:x=w*0.06:y=h*0.695:alpha='if(lt(t,2.8),0,min((t-2.8)/0.4,1))',
    drawbox=x=w*0.06:y=h*0.74:w=280:h=50:color=$GOLD:t=fill,
    drawtext=fontfile=$FONT_SANS:text='VIEW DESSERTS':fontcolor=$BLACK:fontsize=20:x=w*0.06+(280-tw)/2:y=h*0.75:alpha='if(lt(t,3.2),0,min((t-3.2)/0.4,1))'
  " \
  -t 10 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart \
  "$OUT/Vertical_Ad_Birthday.mp4"

echo "=== All 3 vertical ads generated ==="
