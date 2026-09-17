"""Create display-sized WebP files and a full-size preview without changing originals."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
assets = root / 'public/assets'
files = {
    'portfolio': ['architecture.png', 'journey-simple-v3.png', 'tech-chain-inputs-v3.png', 'geofence-safety.png', 'my-role.png'],
    'xiaodongya': ['robot-onsite.png', 'station-service.jpg', 'voice-navigation.png', 'voice-english.jpg', 'press-dushi.png', 'press-chengtou.png'],
    'hangxiaodong': ['home.png', 'robot-map.png', 'city-services.png', 'tourism-routes.png', 'ride-pickup.png', 'ride-status.png'],
}
manifest = {}
original_total = display_total = 0
for folder, names in files.items():
    for name in names:
        source = assets / folder / name
        digest = hashlib.sha256(source.read_bytes()).hexdigest()[:8]
        with Image.open(source) as opened:
            picture = ImageOps.exif_transpose(opened).convert('RGB')
            width, height = picture.size
            variants = {}
            for label, target in [('480', 480), ('960', 960), ('1440', 1440), ('full', width)]:
                size = min(target, width)
                output = assets / 'optimized' / folder / f'{source.stem}-{digest}-{label}.webp'
                output.parent.mkdir(parents=True, exist_ok=True)
                resized = picture.resize((size, round(height * size / width)), Image.Resampling.LANCZOS) if size != width else picture
                resized.save(output, 'WEBP', quality=90 if label == 'full' or folder == 'portfolio' else 84, method=6)
                variants[label] = output.relative_to(assets).as_posix()
            manifest[f'{folder}/{name}'] = {'width': width, 'height': height, 'variants': variants}
        original_total += source.stat().st_size
        display_total += (assets / variants['1440' if folder == 'portfolio' else '960']).stat().st_size

(root / 'src/portfolio/image-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'images': len(manifest), 'original_bytes': original_total, 'display_bytes': display_total, 'reduction_percent': round((1-display_total/original_total)*100, 1)}))
