# 3D Model Asset Notes

All assets below are sourced from the official **Khronos glTF Sample Assets** repository
(`KhronosGroup/glTF-Sample-Assets`, default branch `main`). Each model was downloaded as
the self-contained glTF-Binary (`.glb`) variant. Licenses are quoted verbatim from each
model's `README.md` / `LICENSE.md` in the repo. The downloaded `.glb` files live in
`mobile/assets/models/`.

The project prefers CC0 / public-domain assets. Most models here are pure **CC0 1.0 Universal**.
Two exceptions (Fox and DamagedHelmet) carry **CC BY 4.0** / **CC BY-NC 4.0** components and
are flagged below.

Raw download URL pattern:
`https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/<Name>/glTF-Binary/<Name>.glb`

---

## BoomBox

- **Model Name:** Boom Box
- **Source:** https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/BoomBox
- **Original Author / Upstream Link:** Microsoft ("Microsoft for Everything"). No external/Sketchfab upstream credited.
- **Format:** GLB (glTF-Binary)
- **License:** `CC0 1.0 Universal` (SPDX: `CC0-1.0`)
  - Verbatim from README Legal: `© 2017, Public. CC0 1.0 Universal` — "Microsoft for Everything"
- **Attribution Required:** No (CC0 — public domain dedication). Attribution optional/courtesy only.
  - Suggested courtesy credit text: "Boom Box by Microsoft (CC0 1.0), via Khronos glTF Sample Assets."
- **File Size:** 10,614,184 bytes (~10 MB)
- **Suggested Demo Use:** PBR material showcase — glowing emissive front panel demonstrates emissive maps.

---

## ToyCar

- **Model Name:** Toy Car
- **Source:** https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/ToyCar
- **Original Author / Upstream Link:** Guido Odendahl (initial car model) and Eric Chadwick (extensions and scene composition). No external/Sketchfab upstream credited.
- **Format:** GLB (glTF-Binary)
- **License:** `CC0 1.0 Universal` (SPDX: `CC0-1.0`)
  - Verbatim from README Legal: `© 2020, Public. CC0 1.0 Universal` — "Guido Odendahl for Initial car model"; `© 2020, Public. CC0 1.0 Universal` — "Eric Chadwick for Extensions and scene composition"
- **Attribution Required:** No (CC0 — both contributors released as CC0). Attribution optional/courtesy only.
  - Suggested courtesy credit text: "Toy Car by Guido Odendahl & Eric Chadwick (CC0 1.0), via Khronos glTF Sample Assets."
- **File Size:** 5,422,412 bytes (~5.2 MB)
- **Suggested Demo Use:** Advanced material extensions demo — clearcoat, transmission, and sheen.

---

## WaterBottle

- **Model Name:** Water Bottle
- **Source:** https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/WaterBottle
- **Original Author / Upstream Link:** Microsoft ("Microsoft for Everything"). No external/Sketchfab upstream credited.
- **Format:** GLB (glTF-Binary)
- **License:** `CC0 1.0 Universal` (SPDX: `CC0-1.0`)
  - Verbatim from README Legal: `© 2017, Public. CC0 1.0 Universal` — "Microsoft for Everything"
- **Attribution Required:** No (CC0 — public domain dedication). Attribution optional/courtesy only.
  - Suggested courtesy credit text: "Water Bottle by Microsoft (CC0 1.0), via Khronos glTF Sample Assets."
- **File Size:** 8,966,700 bytes (~8.6 MB)
- **Suggested Demo Use:** Metal/roughness PBR baseline — Normal, Occlusion, and Emissive maps.

---

## Avocado

- **Model Name:** Avocado
- **Source:** https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Avocado
- **Original Author / Upstream Link:** Microsoft ("Microsoft for Everything"). No external/Sketchfab upstream credited.
- **Format:** GLB (glTF-Binary)
- **License:** `CC0 1.0 Universal` (SPDX: `CC0-1.0`)
  - Verbatim from README Legal: `© 2017, Public. CC0 1.0 Universal` — "Microsoft for Everything"
- **Attribution Required:** No (CC0 — public domain dedication). Attribution optional/courtesy only.
  - Suggested courtesy credit text: "Avocado by Microsoft (CC0 1.0), via Khronos glTF Sample Assets."
- **File Size:** 8,110,040 bytes (~7.7 MB)
- **Suggested Demo Use:** Small hand-painted-texture object — good for a compact thumbnail / detail viewer.

---

## Fox

- **Model Name:** Fox
- **Source:** https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Fox
- **Original Author / Upstream Link:** PixelMannen (model), tomkranis (rigging & animation), @AsoboStudio and @scurest (conversion to glTF). glTF conversion via https://github.com/KhronosGroup/glTF-Sample-Models/pull/150#issuecomment-406300118 — no Sketchfab upstream credited.
- **Format:** GLB (glTF-Binary) — animated (animation cycles: Survey, Walk, Run)
- **License:** MIXED — quoted verbatim from README Legal:
  - `© 2014, Public. CC0 1.0 Universal` — "PixelMannen for Model" (SPDX: `CC0-1.0`)
  - `© 2014, tomkranis. CC BY 4.0 International` — "tomkranis for Rigging & Animation" (SPDX: `CC-BY-4.0`)
  - `© 2017, @AsoboStudio and @scurest. CC BY 4.0 International` — "@AsoboStudio and @scurest for Conversion to glTF" (SPDX: `CC-BY-4.0`)
- **Attribution Required:** YES. The base mesh is CC0, but the rigging/animation and the glTF
  conversion (both baked into this `.glb`) are **CC BY 4.0**, which requires attribution.
  - Required attribution text to use: "Fox model by PixelMannen (CC0 1.0); rigging & animation by tomkranis (CC BY 4.0); glTF conversion by @AsoboStudio and @scurest (CC BY 4.0). Via Khronos glTF Sample Assets."
- **File Size:** 162,852 bytes (~160 KB)
- **Suggested Demo Use:** Skeletal animation demo — switch between Survey / Walk / Run cycles.

---

## Notes On Models Not Downloaded

### FlightHelmet (not downloaded — requires conversion)

- **Source:** https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/FlightHelmet
- **glTF-Binary availability:** The `glTF-Binary/FlightHelmet.glb` path returns **HTTP 404** —
  this model does **not** ship as a single-file GLB. It only ships as multi-file glTF
  (`glTF/FlightHelmet.gltf` + external `.bin` and texture files, HTTP 200). Per instructions,
  the multi-file version was **not** downloaded; it would require conversion to GLB to use here.
- **License (for reference):** `CC0 1.0 Universal` (SPDX: `CC0-1.0`) — `© 2018, Public. CC0 1.0 Universal`, "Gary Hsu for Conversion from Maya". No attribution required (CC0).

### DamagedHelmet (not downloaded — license disqualifies)

- **Source:** https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/DamagedHelmet
- **License:** MIXED, contains a **non-commercial** clause — quoted verbatim from README Legal:
  - `© 2018, ctxwing. CC BY 4.0 International` — "ctxwing for Rebuild and conversion to glTF" (SPDX: `CC-BY-4.0`)
  - `© 2016, theblueturtle_. CC BY-NC 4.0 International` — "theblueturtle_ for Earlier version of model" (SPDX: `CC-BY-NC-4.0`)
- **Verdict:** The earlier version of the model is **CC BY-NC 4.0** (non-commercial). This
  disqualifies DamagedHelmet for a CC0-preferred project intended for general/commercial use.
  Not downloaded.
