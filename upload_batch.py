#!/usr/bin/env python3
"""
HansHanf Batch Upload - Mehrere Bilder auf einmal hochladen
"""

import os
import sys
from pathlib import Path
import subprocess

# Sorten-Mapping (Dateiname -> Sorten-Key)
STRAIN_MAPPING = {
    'ak47': 'ak47',
    'amnesia': 'amnesia_haze',
    'black_cherry': 'black_cherry_punch',
    'blue_dream': 'blue_dream',
    'bruce_banner': 'bruce_banner',
    'candy_store': 'candy_store',
    'critical_kush': 'critical_kush',
    'dosidos': 'dosidos',
    'gelato': 'gelato',
    'girl_scout': 'girl_scout_cookies',
    'gorilla': 'gorilla_glue',
    'granddaddy': 'granddaddy_purple',
    'jokerz': 'jokerz',
    'kush_mintz': 'kush_mintz',
    'lemon_haze': 'lemon_haze',
    'northern_lights': 'northern_lights',
    'og_kush': 'og_kush',
    'pineapple': 'pineapple_express',
    'purple_haze': 'purple_haze',
    'runtz': 'runtz',
    'strawberry': 'strawberry_cough',
    'super_skunk': 'super_skunk',
    'wedding_cake': 'wedding_cake',
    'white_widow': 'white_widow',
    'zkittlez': 'zkittlez'
}

def print_header():
    print("=" * 60)
    print("🌿 HansHanf BATCH Upload System")
    print("=" * 60)
    print()

def scan_directory(directory):
    """Scannt ein Verzeichnis nach Bildern"""
    path = Path(directory)
    if not path.exists():
        print(f"❌ Verzeichnis nicht gefunden: {directory}")
        return []
    
    images = []
    for ext in ['*.png', '*.jpg', '*.jpeg', '*.webp']:
        images.extend(path.glob(ext))
    
    return sorted(images)

def detect_strain(filename):
    """Erkennt die Sorte aus dem Dateinamen"""
    name_lower = filename.lower()
    
    for pattern, strain_key in STRAIN_MAPPING.items():
        if pattern in name_lower:
            return strain_key
    
    return None

def upload_batch(directory):
    """Lädt alle Bilder aus einem Verzeichnis hoch"""
    images = scan_directory(directory)
    
    if not images:
        print("❌ Keine Bilder gefunden!")
        return
    
    print(f"📁 Gefunden: {len(images)} Bilder")
    print()
    
    uploaded = []
    skipped = []
    
    for img_path in images:
        strain_key = detect_strain(img_path.stem)
        
        if strain_key:
            print(f"✓ {img_path.name} → {strain_key}")
            
            # Kopiere zu docs/products/
            target = Path("docs/products") / f"{strain_key}.png"
            target.parent.mkdir(parents=True, exist_ok=True)
            
            # Konvertiere zu PNG
            import shutil
            if img_path.suffix.lower() == '.png':
                shutil.copy2(img_path, target)
            else:
                # Für andere Formate: kopieren und umbenennen
                shutil.copy2(img_path, target.with_suffix(img_path.suffix))
                os.rename(target.with_suffix(img_path.suffix), target)
            
            uploaded.append((img_path.name, strain_key))
        else:
            print(f"⚠ {img_path.name} → Sorte nicht erkannt")
            skipped.append(img_path.name)
    
    print()
    print(f"📊 Upload-Statistik:")
    print(f"   ✅ Erfolgreich: {len(uploaded)}")
    print(f"   ⚠️  Übersprungen: {len(skipped)}")
    
    if uploaded:
        print()
        print("🚀 Veröffentliche Änderungen...")
        
        try:
            subprocess.run(['git', 'add', 'docs/products/'], check=True)
            subprocess.run(['git', 'commit', '-m', f'Add {len(uploaded)} product images'], check=True)
            subprocess.run(['git', 'push', 'origin', 'main'], check=True)
            
            print()
            print("=" * 60)
            print("🎉 BATCH UPLOAD ERFOLGREICH!")
            print("=" * 60)
            print()
            print("Hochgeladene Bilder:")
            for name, key in uploaded:
                print(f"  ✓ {name}")
            print()
            print("🌐 Shop aktualisiert sich in 2-3 Minuten")
            print("🔗 https://muttihauweg-pixel.github.io/hanshanf/")
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Git Fehler: {e}")
            print("   Bitte manuell committen und pushen")

def main():
    print_header()
    
    if len(sys.argv) < 2:
        print("Verwendung:")
        print(f"  python3 {sys.argv[0]} <ordner-pfad>")
        print()
        print("Beispiel:")
        print(f"  python3 {sys.argv[0]} ~/Downloads/cannabis_bilder")
        print()
        print("Hinweis: Bilder sollten den Sortennamen im Dateinamen enthalten")
        print("z.B. 'gorilla_glue_photo.jpg', 'blue_dream.png', etc.")
        sys.exit(1)
    
    directory = sys.argv[1]
    upload_batch(directory)

if __name__ == "__main__":
    main()
