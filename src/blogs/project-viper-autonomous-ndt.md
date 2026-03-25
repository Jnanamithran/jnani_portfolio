# Project V.I.P.E.R.: Autonomous NDT in Subterranean Environments

*March 26, 2026 · 12 min read*

---

## Problem Definition

In industrial infrastructure, the "invisible failure" is the most dangerous. Traditional pipeline inspection relies on manual labor—sending a technician into a confined, hazardous space with a flashlight—or using "dumb" crawlers that only provide a video feed. 

The problem? Humans miss micro-cracks, and video feeds don't show structural thinning or gas accumulation. I didn't just want to build a remote-controlled car with a camera; I needed an **Autonomous Non-Destructive Testing (NDT) platform** that could identify, measure, and log structural anomalies in pitch-black, subterranean conduits without human bias.

---

## Approach

I designed V.I.P.E.R. (Visual Inspection & Pipe Exploration Rover) around the concept of **Sensor Fusion**. Instead of relying on a single data point, the system merges three distinct layers of environmental intelligence:

1.  **Optical Intelligence**: Custom-trained **YOLOv8** models (viper_pipe_v1) to identify structural fractures and corrosion with 94% accuracy.
2.  **Thermal Intelligence**: An **MLX90640** array to identify heat leaks and thinning walls.
3.  **Chemical Intelligence**: An **MQ4 sensor** to detect Methane ($CH_4$) and Natural Gas leaks before they reach explosive concentrations.

The software stack is a distributed architecture. A **Raspberry Pi 4** handles the hardware "Edge" (motors and raw sensor polling), while a **High-Performance Laptop** acts as the "Brain," running heavy AI inference and serving a React-based Manager Dashboard via a local web server. The system supports both YOLOv8 and YOLOv11 models for future performance upgrades.

---

## Architecture

The system operates in a real-time loop, processing data locally with cloud logging capabilities in under 150ms.

```text
[ Physical Pipe ]          [ Edge Layer (Pi 4) ]          [ AI Server (Laptop) ]
       │                          │                              │
       ├─ USB Camera ───────────▶ Raw BGR Stream ──────────────▶ YOLOv8 Inference
       ├─ MLX90640 ─────────────▶ I2C Thermal Data ───────────▶ Thermal Blending
       └─ MQ4 Sensor ───────────▶ Analog Gas PPM ──────────────▶ Firebase Logging
                                                                 │
                                                                 ▼
                                                        [ Manager Dashboard ]
                                                         (React + Tailwind)
```



### **The "Ghost Vision" Blending Logic**
One of the most complex parts was overlaying the 32x24 thermal data onto a 640x480 video frame. In the `ai_server.py`, I implemented a weighted alpha-blending technique to create the HUD:

```python
# Blending the upscaled thermal heatmap with the raw camera frame
# alpha: transparency of the visual frame | beta: transparency of the thermal map
blended_frame = cv2.addWeighted(
    bgr_frame, 0.7, 
    upscaled_thermal_map, 0.3, 
    0
)
```

### **Dual-Pipeline Detection Architecture**
The system runs two parallel detection pipelines:
- **YOLOv8 Pipeline**: General object detection for scene awareness
- **CrackAnalyzer Pipeline**: OpenCV-based NDT crack detection with skeletonization for precise measurements

This dual approach ensures both broad environmental awareness and specialized crack analysis capabilities.

---

## Technical Deep Dive: Crack Skeletonization

Detection isn't enough; an NDT auditor needs measurements. When YOLOv8 identifies a "crack," the system triggers the **Morphological Analysis** pipeline. We use "Skeletonization" to reduce the crack to a 1-pixel wide line, allowing us to calculate its true geometric length and width.

The real-world width is calculated using the following formula:

$$Width_{mm} = \frac{Pixel\_Width \times Pipe\_Diameter_{mm}}{Frame\_Width_{pixels}}$$

### **Severity Classification System**
Cracks are automatically classified into three severity levels based on bounding box area relative to frame size:
- **MINOR**: < 1% of frame area (< 3072 px²) - hairline cracks
- **MODERATE**: 1-4% of frame area (3072-12288 px²) - medium structural cracks  
- **CRITICAL**: > 4% of frame area (> 12288 px²) - large/severe cracks

This automated classification helps prioritize maintenance actions and provides immediate risk assessment.

### **Skeletonization Code Snippet**
```python
def get_crack_skeleton(binary_mask):
    # Perform morphological thinning to get the 'center-line' of the crack
    skeleton = cv2.ximgproc.thinning(binary_mask)
    
    # Calculate Euclidean distance between the edges to find max width
    dist_transform = cv2.distanceTransform(binary_mask, cv2.DIST_L2, 5)
    max_width_pixels = np.max(dist_transform) * 2
    
    return skeleton, max_width_pixels
```



---

## Challenges

**Challenge 1: The "Low-Light" Noise.** Subterranean pipes are dark. Standard YOLO models struggle with the grain. I solved this by implementing a **CLAHE (Contrast Limited Adaptive Histogram Equalization)** pre-processing step to normalize lighting before the AI scans the frame.

**Challenge 2: Thermal-Visual Parallax.** The camera and the MLX90640 are physically 2cm apart. At close range, the thermal map doesn't line up with the crack. I implemented a coordinate offset map in the backend to "shift" the thermal pixels based on the rover's estimated distance from the wall.

**Challenge 3: Real-Time Synchronization.** Sending high-definition video and high-frequency sensor data over a local Wi-Fi network caused "lag spikes." I moved to a **Multiprocess Worker Pattern** in Python, where one process handles the camera stream and another handles sensor polling, preventing the UI from freezing during a gas alert.

**Challenge 4: Model Optimization.** Balancing detection accuracy with real-time performance required careful model selection. The custom viper_pipe_v1 model achieves 94% accuracy while maintaining sub-200ms processing times.

---

## Outcome

Developed as a 3rd-year project at **St. Thomas Institute for Science & Technology**, the final V.I.P.E.R. prototype identifies structural cracks as small as **0.5mm** with **94% accuracy**. 

During testing in a 200mm PVC conduit, the system successfully identified a simulated methane leak and a structural fracture simultaneously, logging the data to Firebase and alerting the operator via the dashboard in **<200ms**.

### **Key Technical Specifications**
- **Processing Pipeline**: Dual YOLOv8 + OpenCV CrackAnalyzer
- **Detection Speed**: < 200ms per frame
- **Accuracy**: 94% for crack detection (mAP50: 0.653)
- **Sensor Fusion**: RGB camera + thermal imaging + gas detection
- **Communication**: Local Wi-Fi with Firebase cloud logging
- **Power**: 12V DC with battery backup capability
- **Operating Environment**: Subterranean, confined spaces, low-light conditions

The biggest lesson? **In robotics, the hardware gets you into the room, but the data integrity keeps you there.** By focusing on quantifiable measurements instead of just video, V.I.P.E.R. transforms from a "toy" into a professional NDT tool.