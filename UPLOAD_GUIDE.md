# 📤 HansHanf Bild-Upload Anleitung

## Schnellstart

### 1. Einzelnes Bild hochladen

```bash
python3 upload_image.py ~/Downloads/dein_bild.png gorilla_glue
```

### 2. Alle Bilder aus Ordner hochladen

```bash
python3 upload_batch.py ~/Downloads/cannabis_bilder/
```

---

## Verfügbare Sorten

| Key | Sorte |
|-----|-------|
| ak47 | AK-47 |
| amnesia_haze | Amnesia Haze |
| black_cherry_punch | Black Cherry Punch |
| blue_dream | Blue Dream |
| bruce_banner | Bruce Banner |
| candy_store | Candy Store |
| critical_kush | Critical Kush |
| dosidos | Do-Si-Dos |
| gelato | Gelato |
| girl_scout_cookies | Girl Scout Cookies |
| gorilla_glue | Gorilla Glue |
| granddaddy_purple | Granddaddy Purple |
| jokerz | Jokerz |
| kush_mintz | Kush Mintz |
| lemon_haze | Lemon Haze |
| northern_lights | Northern Lights |
| og_kush | OG Kush |
| pineapple_express | Pineapple Express |
| purple_haze | Purple Haze |
| runtz | Runtz |
| strawberry_cough | Strawberry Cough |
| super_skunk | Super Skunk |
| wedding_cake | Wedding Cake |
| white_widow | White Widow |
| zkittlez | Zkittlez |

---

## Bild-Generierung mit KI

### Midjourney Prompt
```
Professional cannabis buds [SORTENNAME] on pure white background, photorealistic, studio lighting, high detail, macro photography, product photography style, 8k quality --ar 1:1 --v 6
```

### DALL-E / Bing Image Creator Prompt
```
Professional cannabis buds on white background, photorealistic product photography, studio lighting, high detail, macro shot, isolated on white
```

### Ideale Spezifikationen
- **Format:** 800x800px (1:1)
- **Hintergrund:** Rein weiß (#FFFFFF)
- **Format:** PNG (beste Qualität)
- **Max Größe:** 5MB

---

## Workflow

1. **Generiere Bilder** mit Midjourney/DALL-E/Bing
2. **Speichere** als `[sortenname].png`
3. **Lade hoch** mit `upload_image.py` oder `upload_batch.py`
4. **Fertig!** Shop aktualisiert sich automatisch in 2-3 Minuten

---

## Fehlerbehebung

### "Bild wird nicht angezeigt"
- Cache leeren: `Strg+F5` (Windows) oder `Cmd+Shift+R` (Mac)
- Oder Inkognito-Fenster verwenden

### "Git Fehler"
```bash
git status
git add docs/products/
git commit -m "Add images"
git push origin main
```

### "Bild zu groß"
- Bild komprimieren: https://tinypng.com/
- Oder kleinere Auflösung wählen

---

## Support

Bei Problemen: Einfach Bescheid geben! 🌿
