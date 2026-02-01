{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Uranium-235 Fission Mod for Sandboxels\
// Compatible with Steam version on M4 Mac\
// Fixed: "Unknown" element bug and Neutron spawning logic\
\
var fissionCategory = "fission";\
\
if (!elements.categories) \{\
    elements.categories = [];\
\}\
if (!elements.categories.includes(fissionCategory)) \{\
    elements.categories.push(fissionCategory);\
\}\
\
elements.uranium_235 = \{\
    color: ["#c0c0c0", "#a8a8a8", "#b5b5b5", "#9d9d9d"],\
    behavior: behaviors.WALL,\
    reactions: \{\
        "neutron": \{ \
            "elem1": "uranium_236", // Turns into unstable isotope\
            "elem2": null,          // Consumes the neutron\
            "chance": 0.8, \
            "temp1": 200,\
            "func": function(pixel) \{\
                // This replaces the array you had. We spawn the extra energy manually here.\
                pixel.temp += 100;\
                var neighbors = [[-1,0], [1,0], [0,-1], [0,1]];\
                var n = neighbors[Math.floor(Math.random() * neighbors.length)];\
                if (isEmpty(pixel.x + n[0], pixel.y + n[1], true)) \{\
                    createPixel("energy", pixel.x + n[0], pixel.y + n[1]);\
                \}\
            \}\
        \}\
    \},\
    category: fissionCategory,\
    state: "solid",\
    density: 19100,\
    hardness: 0.6,\
    conduct: 0.27,\
    temp: 20,\
    tempHigh: 1405,\
    stateHigh: "molten_uranium_235",\
    tempLow: -273.15,\
    hidden: false\
\};\
\
elements.molten_uranium_235 = \{\
    color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],\
    behavior: behaviors.MOLTEN,\
    reactions: \{\
        "neutron": \{ \
            "elem1": "molten_uranium_236", \
            "elem2": null, \
            "chance": 0.9, \
            "temp1": 250 \
        \}\
    \},\
    category: fissionCategory,\
    state: "liquid",\
    density: 17300,\
    conduct: 0.3,\
    temp: 1500,\
    tempLow: 1405,\
    stateLow: "uranium_235",\
    hidden: false\
\};\
\
elements.uranium_236 = \{\
    color: "#a8b5a8",\
    behavior: behaviors.POWDER,\
    tick: function(pixel) \{\
        // Higher chance to ensure it reacts quickly\
        if (Math.random() < 0.15) \{\
            \
            // Release neutrons in random directions\
            for (var i = 0; i < 3; i++) \{\
                var angle = Math.random() * Math.PI * 2;\
                var speed = 2 + Math.random() * 2;\
                var nx = Math.round(pixel.x + Math.cos(angle) * speed);\
                var ny = Math.round(pixel.y + Math.sin(angle) * speed);\
                \
                // FIXED: Changed !isEmpty to isEmpty so it spawns in air\
                if (isEmpty(nx, ny, true)) \{\
                    createPixel("neutron", nx, ny);\
                \}\
            \}\
            \
            // Release energy and heat\
            pixel.temp += 800;\
            \
            // Heat surrounding pixels\
            for (var dx = -2; dx <= 2; dx++) \{\
                for (var dy = -2; dy <= 2; dy++) \{\
                    if (dx === 0 && dy === 0) continue;\
                    var nx = pixel.x + dx;\
                    var ny = pixel.y + dy;\
                    if (!isEmpty(nx, ny, true)) \{\
                        var nearPixel = pixelMap[nx][ny];\
                        if (nearPixel && nearPixel.temp !== undefined) \{\
                            nearPixel.temp += 100;\
                        \}\
                    \}\
                \}\
            \}\
            \
            // VITAL: The uranium atom splits, so it must stop being uranium.\
            // It either turns into energy or disappears.\
            if (Math.random() < 0.5) \{\
                changePixel(pixel, "energy");\
            \} else \{\
                deletePixel(pixel.x, pixel.y);\
            \}\
        \}\
    \},\
    category: fissionCategory,\
    state: "solid",\
    density: 19100,\
    hardness: 0.5,\
    conduct: 0.25,\
    temp: 100,\
    tempHigh: 1405,\
    stateHigh: "molten_uranium_236",\
    radioactive: true,\
    hidden: false\
\};\
\
elements.molten_uranium_236 = \{\
    color: ["#ff6600", "#ff8800", "#ff7700", "#ff9900"],\
    behavior: behaviors.MOLTEN,\
    tick: function(pixel) \{\
        if (Math.random() < 0.2) \{\
            \
            for (var i = 0; i < 3; i++) \{\
                var angle = Math.random() * Math.PI * 2;\
                var speed = 2 + Math.random() * 2;\
                var nx = Math.round(pixel.x + Math.cos(angle) * speed);\
                var ny = Math.round(pixel.y + Math.sin(angle) * speed);\
                \
                // FIXED: Spawns in empty space\
                if (isEmpty(nx, ny, true)) \{\
                    createPixel("neutron", nx, ny);\
                \}\
            \}\
            \
            pixel.temp += 900;\
            \
            for (var dx = -2; dx <= 2; dx++) \{\
                for (var dy = -2; dy <= 2; dy++) \{\
                    if (dx === 0 && dy === 0) continue;\
                    var nx = pixel.x + dx;\
                    var ny = pixel.y + dy;\
                    if (!isEmpty(nx, ny, true)) \{\
                        var nearPixel = pixelMap[nx][ny];\
                        if (nearPixel && nearPixel.temp !== undefined) \{\
                            nearPixel.temp += 150;\
                        \}\
                    \}\
                \}\
            \}\
            \
            // Clean up pixel\
            if (Math.random() < 0.5) \{\
                changePixel(pixel, "energy");\
            \} else \{\
                deletePixel(pixel.x, pixel.y);\
            \}\
        \}\
    \},\
    category: fissionCategory,\
    state: "liquid",\
    density: 17300,\
    conduct: 0.28,\
    temp: 1500,\
    tempLow: 1405,\
    stateLow: "uranium_236",\
    radioactive: true,\
    hidden: false\
\};}