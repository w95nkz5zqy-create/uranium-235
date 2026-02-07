// Antimatter Mod for Sandboxels
// Contains antimatter versions of all elements
// Antimatter annihilates with normal matter on contact

var antimatterCategory = "antimatter";

if (!elements.categories) {
    elements.categories = [];
}
if (!elements.categories.includes(antimatterCategory)) {
    elements.categories.push(antimatterCategory);
}

// Helper function to create antimatter-matter annihilation
function annihilate(pixel1, pixel2) {
    // Create explosion/energy
    deletePixel(pixel1.x, pixel1.y);
    deletePixel(pixel2.x, pixel2.y);
    
    // Create energy particles
    for (var i = 0; i < 5; i++) {
        var angle = Math.random() * Math.PI * 2;
        var dist = 1 + Math.random() * 3;
        var ex = Math.round(pixel1.x + Math.cos(angle) * dist);
        var ey = Math.round(pixel1.y + Math.sin(angle) * dist);
        
        if (isEmpty(ex, ey)) {
            createPixel("energy", ex, ey);
        }
    }
}

// LAND CATEGORY - Antimatter Solids
elements.anti_sand = {
    color: ["#3f3f1f", "#2f2f0f", "#4f4f2f"],
    behavior: behaviors.POWDER,
    category: antimatterCategory,
    state: "solid",
    density: 1602,
    temp: 20,
    reactions: {
        "sand": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_dirt = {
    color: ["#2a0a0a", "#1a0000", "#3a1a1a"],
    behavior: behaviors.POWDER,
    category: antimatterCategory,
    state: "solid",
    density: 1200,
    temp: 20,
    reactions: {
        "dirt": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_mud = {
    color: ["#1a3a1a", "#0a2a0a", "#2a4a2a"],
    behavior: behaviors.LIQUID,
    category: antimatterCategory,
    state: "liquid",
    density: 1800,
    temp: 20,
    reactions: {
        "mud": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_wet_sand = {
    color: ["#2a2a0a", "#1a1a00", "#3a3a1a"],
    behavior: behaviors.POWDER,
    category: antimatterCategory,
    state: "solid",
    density: 1800,
    temp: 20,
    reactions: {
        "wet_sand": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_rock = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 2700,
    temp: 20,
    reactions: {
        "rock": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_gravel = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.POWDER,
    category: antimatterCategory,
    state: "solid",
    density: 1800,
    temp: 20,
    reactions: {
        "gravel": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_clay = {
    color: ["#3a1a1a", "#2a0a0a", "#4a2a2a"],
    behavior: behaviors.POWDER,
    category: antimatterCategory,
    state: "solid",
    density: 2000,
    temp: 20,
    reactions: {
        "clay": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_stone = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 2500,
    temp: 20,
    reactions: {
        "stone": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// LIQUIDS CATEGORY
elements.anti_water = {
    color: ["#3f0000", "#2f0000", "#4f0000"],
    behavior: behaviors.LIQUID,
    category: antimatterCategory,
    state: "liquid",
    density: 1000,
    temp: 20,
    tempHigh: 100,
    stateHigh: "anti_steam",
    tempLow: 0,
    stateLow: "anti_ice",
    reactions: {
        "water": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_salt_water = {
    color: ["#3f0f0f", "#2f0000", "#4f1f1f"],
    behavior: behaviors.LIQUID,
    category: antimatterCategory,
    state: "liquid",
    density: 1025,
    temp: 20,
    reactions: {
        "salt_water": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_oil = {
    color: ["#1a1a00", "#0a0a00", "#2a2a00"],
    behavior: behaviors.LIQUID,
    category: antimatterCategory,
    state: "liquid",
    density: 900,
    temp: 20,
    reactions: {
        "oil": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_lava = {
    color: ["#003f3f", "#002f2f", "#004f4f"],
    behavior: behaviors.LIQUID,
    category: antimatterCategory,
    state: "liquid",
    density: 3100,
    temp: 1200,
    reactions: {
        "lava": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// GASES CATEGORY
elements.anti_steam = {
    color: ["#3f0000", "#2f0000", "#4f0000"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 0.6,
    temp: 100,
    tempLow: 100,
    stateLow: "anti_water",
    reactions: {
        "steam": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.antihydrogen = {
    color: ["#3f0f3f", "#2f002f", "#4f1f4f"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 0.09,
    temp: 20,
    reactions: {
        "hydrogen": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_oxygen = {
    color: ["#00003f", "#00002f", "#00004f"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 1.43,
    temp: 20,
    reactions: {
        "oxygen": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_nitrogen = {
    color: ["#3f003f", "#2f002f", "#4f004f"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 1.25,
    temp: 20,
    reactions: {
        "nitrogen": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_carbon_dioxide = {
    color: ["#1a1a1a", "#0a0a0a", "#2a2a2a"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 1.98,
    temp: 20,
    reactions: {
        "carbon_dioxide": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// SOLIDS/METALS CATEGORY
elements.anti_ice = {
    color: ["#3f0000", "#2f0000", "#4f0000"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 917,
    temp: -10,
    tempHigh: 0,
    stateHigh: "anti_water",
    reactions: {
        "ice": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_iron = {
    color: ["#1a3a3a", "#0a2a2a", "#2a4a4a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 7874,
    conduct: 0.8,
    temp: 20,
    reactions: {
        "iron": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_copper = {
    color: ["#1a2a0a", "#0a1a00", "#2a3a1a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 8960,
    conduct: 0.9,
    temp: 20,
    reactions: {
        "copper": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_gold = {
    color: ["#1a1a3f", "#0a0a2f", "#2a2a4f"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 19320,
    conduct: 0.7,
    temp: 20,
    reactions: {
        "gold": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_silver = {
    color: ["#1a1a1a", "#0a0a0a", "#2a2a2a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 10490,
    conduct: 1,
    temp: 20,
    reactions: {
        "silver": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_steel = {
    color: ["#1a2a2a", "#0a1a1a", "#2a3a3a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 7850,
    conduct: 0.5,
    hardness: 0.9,
    temp: 20,
    reactions: {
        "steel": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// ENERGY/FISSION CATEGORY
elements.antineutron = {
    color: ["#3f003f", "#2f002f", "#4f004f"],
    behavior: [
        "XX|M2%10|XX",
        "M2%10|XX|M2%10",
        "XX|M2%10|XX",
    ],
    category: antimatterCategory,
    state: "gas",
    density: 0,
    temp: 20,
    reactions: {
        "neutron": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.antiproton = {
    color: ["#00003f", "#00002f", "#00004f"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 0,
    temp: 20,
    reactions: {
        "proton": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_uranium_235 = {
    color: ["#3f3f3f", "#2f2f2f", "#4f4f4f"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 19100,
    temp: 20,
    reactions: {
        "uranium_235": { "elem1": null, "elem2": null, "func": annihilate },
        "uranium": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_plutonium_239 = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 19800,
    temp: 20,
    reactions: {
        "plutonium_239": { "elem1": null, "elem2": null, "func": annihilate },
        "plutonium": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// Add more common elements
elements.anti_glass = {
    color: ["#0f0f0f", "#050505", "#1f1f1f"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 2500,
    temp: 20,
    reactions: {
        "glass": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_wood = {
    color: ["#1a0a3a", "#0a002a", "#2a1a4a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 700,
    temp: 20,
    reactions: {
        "wood": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_concrete = {
    color: ["#1a1a1a", "#0a0a0a", "#2a2a2a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 2400,
    hardness: 0.8,
    temp: 20,
    reactions: {
        "concrete": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_aluminum = {
    color: ["#2a1a1a", "#1a0a0a", "#3a2a2a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 2700,
    conduct: 0.9,
    temp: 20,
    reactions: {
        "aluminum": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_uranium = {
    color: ["#0a3a0a", "#002a00", "#1a4a1a"],
    behavior: behaviors.WALL,
    category: antimatterCategory,
    state: "solid",
    density: 19100,
    radioactive: true,
    temp: 20,
    reactions: {
        "uranium": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

console.log("Antimatter mod loaded - " + Object.keys(elements).filter(k => k.startsWith("anti_")).length + " antimatter elements created");

// Real antimatter particles with proper scientific names
elements.positron = {
    color: ["#ff00ff", "#ef00ef", "#ff10ff"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 0,
    temp: 20,
    reactions: {
        "electron": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.antihelium = {
    color: ["#1f1f3f", "#0f0f2f", "#2f2f4f"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 0.18,
    temp: 20,
    reactions: {
        "helium": { "elem1": null, "elem2": null, "func": annihilate }
    }
};


// Antimatter versions of fission mod elements

// Antimatter Uranium-235
elements.anti_uranium_235 = {
    color: ["#3f3f3f", "#2f2f2f", "#4f4f4f"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Check adjacent pixels for antineutrons
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel && nearPixel.element === "antineutron") {
                        // Delete antineutron
                        deletePixel(nx, ny);
                        
                        // Create 3 new antineutrons
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("antineutron", spawnX, spawnY);
                            }
                        }
                        
                        pixel.temp += 300;
                        return;
                    }
                }
            }
        }
    },
    category: antimatterCategory,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.27,
    temp: 20,
    tempHigh: 3500,
    stateHigh: "anti_molten_uranium_235",
    reactions: {
        "uranium_235": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_molten_uranium_235 = {
    color: ["#006f00", "#005f00", "#007f00"],
    behavior: behaviors.MOLTEN,
    category: antimatterCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.3,
    temp: 3600,
    tempLow: 3500,
    stateLow: "anti_uranium_235",
    reactions: {
        "molten_uranium_235": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_uranium_236 = {
    color: "#2a1a2a",
    behavior: behaviors.POWDER,
    category: antimatterCategory,
    state: "solid",
    density: 19100,
    hardness: 0.5,
    conduct: 0.25,
    temp: 100,
    tempHigh: 3500,
    stateHigh: "anti_molten_uranium_236",
    radioactive: true,
    reactions: {
        "uranium_236": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_molten_uranium_236 = {
    color: ["#001f1f", "#000f0f", "#002f2f"],
    behavior: behaviors.MOLTEN,
    category: antimatterCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.28,
    temp: 1500,
    tempLow: 3500,
    stateLow: "anti_uranium_236",
    radioactive: true,
    reactions: {
        "molten_uranium_236": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// Antimatter Plutonium-239
elements.anti_plutonium_239 = {
    color: ["#2a2a2a", "#1a1a1a", "#3a3a3a"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel && nearPixel.element === "antineutron") {
                        deletePixel(nx, ny);
                        
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("antineutron", spawnX, spawnY);
                            }
                        }
                        
                        pixel.temp += 300;
                        return;
                    }
                }
            }
        }
    },
    category: antimatterCategory,
    state: "solid",
    density: 19800,
    hardness: 0.6,
    conduct: 0.06,
    temp: 20,
    tempHigh: 640,
    stateHigh: "anti_molten_plutonium_239",
    radioactive: true,
    reactions: {
        "plutonium_239": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_molten_plutonium_239 = {
    color: ["#005f00", "#004f00", "#006f00"],
    behavior: behaviors.MOLTEN,
    category: antimatterCategory,
    state: "liquid",
    density: 16600,
    conduct: 0.1,
    temp: 700,
    tempLow: 640,
    stateLow: "anti_plutonium_239",
    radioactive: true,
    reactions: {
        "molten_plutonium_239": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// Antimatter fission products
elements.anti_barium_141 = {
    color: ["#1f0f0f", "#0f0000", "#2f1f1f"],
    behavior: behaviors.MOLTEN,
    category: antimatterCategory,
    state: "liquid",
    density: 3300,
    temp: 1000,
    tempLow: 700,
    stateLow: "anti_barium_141_solid",
    radioactive: true,
    reactions: {
        "barium_141": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_barium_141_solid = {
    color: ["#1a0f0a", "#0a0000", "#2a1f1a"],
    behavior: behaviors.POWDER,
    category: antimatterCategory,
    state: "solid",
    density: 3510,
    temp: 20,
    tempHigh: 700,
    stateHigh: "anti_barium_141",
    radioactive: true,
    reactions: {
        "barium_141_solid": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_krypton_92 = {
    color: ["#0f0f1a", "#00000a", "#1f1f2a"],
    behavior: behaviors.GAS,
    category: antimatterCategory,
    state: "gas",
    density: 3.75,
    temp: 20,
    radioactive: true,
    reactions: {
        "krypton_92": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// Antimatter Control Rods
elements.anti_control_rod = {
    color: ["#1f1f1f", "#0f0f0f", "#2f2f2f"],
    behavior: behaviors.WALL,
    reactions: {
        "antineutron": { "elem1": "anti_control_rod", "elem2": null, "chance": 0.95 },
        "antiproton": { "elem1": "anti_control_rod", "elem2": null, "chance": 0.95 },
        "control_rod": { "elem1": null, "elem2": null, "func": annihilate }
    },
    category: antimatterCategory,
    state: "solid",
    density: 10200,
    hardness: 0.8,
    conduct: 0.5,
    temp: 20,
    tempHigh: 2750,
    stateHigh: "anti_molten_control_rod"
};

elements.anti_molten_control_rod = {
    color: ["#005f00", "#004f00", "#006f00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "antineutron": { "elem1": "anti_molten_control_rod", "elem2": null, "chance": 0.85 },
        "antiproton": { "elem1": "anti_molten_control_rod", "elem2": null, "chance": 0.85 },
        "molten_control_rod": { "elem1": null, "elem2": null, "func": annihilate }
    },
    category: antimatterCategory,
    state: "liquid",
    density: 9500,
    conduct: 0.6,
    temp: 2800,
    tempLow: 2750,
    stateLow: "anti_control_rod"
};

// Antimatter Absorbers
elements.anti_krypton_absorber = {
    color: ["#1a0f2a", "#0a001a", "#2a1f3a"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    tick: function(pixel) {
        for (var dx = -4; dx <= 4; dx++) {
            for (var dy = -4; dy <= 4; dy++) {
                if (dx === 0 && dy === 0) continue;
                var kx = pixel.x + dx;
                var ky = pixel.y + dy;
                
                if (!isEmpty(kx, ky, true)) {
                    var kPixel = pixelMap[kx][ky];
                    
                    if (kPixel && kPixel.element === "anti_krypton_92") {
                        var dirX = pixel.x - kx;
                        var dirY = pixel.y - ky;
                        
                        if (Math.abs(dirX) <= 1 && Math.abs(dirY) <= 1) {
                            deletePixel(kx, ky);
                            return;
                        } else {
                            var moveX = kx + (dirX !== 0 ? (dirX > 0 ? 1 : -1) : 0);
                            var moveY = ky + (dirY !== 0 ? (dirY > 0 ? 1 : -1) : 0);
                            
                            if (isEmpty(moveX, moveY)) {
                                movePixel(kPixel, moveX, moveY);
                                return;
                            }
                        }
                    }
                }
            }
        }
    },
    category: antimatterCategory,
    state: "solid",
    density: 8500,
    hardness: 0.7,
    conduct: 0.3,
    temp: 20,
    reactions: {
        "krypton_absorber": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_barium_absorber = {
    color: ["#0f1a3a", "#001a2a", "#1f2a4a"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    tick: function(pixel) {
        for (var dx = -4; dx <= 4; dx++) {
            for (var dy = -4; dy <= 4; dy++) {
                if (dx === 0 && dy === 0) continue;
                var bx = pixel.x + dx;
                var by = pixel.y + dy;
                
                if (!isEmpty(bx, by, true)) {
                    var bPixel = pixelMap[bx][by];
                    
                    if (bPixel && (bPixel.element === "anti_barium_141" || bPixel.element === "anti_barium_141_solid")) {
                        var dirX = pixel.x - bx;
                        var dirY = pixel.y - by;
                        
                        if (Math.abs(dirX) <= 1 && Math.abs(dirY) <= 1) {
                            deletePixel(bx, by);
                            return;
                        } else {
                            var moveX = bx + (dirX !== 0 ? (dirX > 0 ? 1 : -1) : 0);
                            var moveY = by + (dirY !== 0 ? (dirY > 0 ? 1 : -1) : 0);
                            
                            if (isEmpty(moveX, moveY)) {
                                movePixel(bPixel, moveX, moveY);
                                return;
                            }
                        }
                    }
                }
            }
        }
    },
    category: antimatterCategory,
    state: "solid",
    density: 9000,
    hardness: 0.7,
    conduct: 0.4,
    temp: 20,
    reactions: {
        "barium_absorber": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_hydrogen_absorber = {
    color: ["#1a0f3a", "#0a002a", "#2a1f4a"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    category: antimatterCategory,
    state: "solid",
    density: 8900,
    hardness: 0.7,
    conduct: 0.4,
    temp: 20,
    tempHigh: 1800,
    stateHigh: "anti_molten_hydrogen_absorber",
    reactions: {
        "hydrogen_absorber": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_molten_hydrogen_absorber = {
    color: ["#006f00", "#005f00", "#007f00"],
    behavior: behaviors.MOLTEN,
    category: antimatterCategory,
    state: "liquid",
    density: 8200,
    conduct: 0.5,
    temp: 1850,
    tempLow: 1800,
    stateLow: "anti_hydrogen_absorber",
    reactions: {
        "molten_hydrogen_absorber": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

// Antimatter Neutron Emitter & Receiver
elements.anti_neutron_emitter = {
    color: ["#1f1f00", "#0f0f00", "#2f2f00"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    conduct: 1,
    tick: function(pixel) {
        var shouldEmit = false;
        
        if (pixel.charge && pixel.charge > 0) {
            shouldEmit = true;
        }
        
        if (!shouldEmit) {
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    var cx = pixel.x + dx;
                    var cy = pixel.y + dy;
                    
                    if (!isEmpty(cx, cy, true)) {
                        var nearPixel = pixelMap[cx][cy];
                        if (nearPixel && ((nearPixel.charge && nearPixel.charge > 0) || 
                                         nearPixel.element === "electric" ||
                                         nearPixel.element === "lightning")) {
                            shouldEmit = true;
                            break;
                        }
                    }
                }
                if (shouldEmit) break;
            }
        }
        
        if (shouldEmit && Math.random() < 0.3) {
            var receiverX = null;
            var receiverY = null;
            
            for (var rx = -5; rx <= 5; rx++) {
                for (var ry = -5; ry <= 5; ry++) {
                    if (rx === 0 && ry === 0) continue;
                    var checkX = pixel.x + rx;
                    var checkY = pixel.y + ry;
                    
                    if (!isEmpty(checkX, checkY, true)) {
                        var checkPixel = pixelMap[checkX][checkY];
                        if (checkPixel && checkPixel.element === "anti_neutron_receiver") {
                            receiverX = checkX;
                            receiverY = checkY;
                            break;
                        }
                    }
                }
                if (receiverX !== null) break;
            }
            
            if (receiverX !== null) {
                var dirX = receiverX > pixel.x ? 1 : (receiverX < pixel.x ? -1 : 0);
                var dirY = receiverY > pixel.y ? 1 : (receiverY < pixel.y ? -1 : 0);
                
                var emitX = pixel.x + dirX;
                var emitY = pixel.y + dirY;
                
                if (isEmpty(emitX, emitY)) {
                    createPixel("antineutron", emitX, emitY);
                }
            } else {
                if (isEmpty(pixel.x + 1, pixel.y)) {
                    createPixel("antineutron", pixel.x + 1, pixel.y);
                }
            }
        }
    },
    category: antimatterCategory,
    state: "solid",
    density: 8000,
    hardness: 0.8,
    temp: 20,
    reactions: {
        "neutron_emitter": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

elements.anti_neutron_receiver = {
    color: ["#1f001f", "#0f000f", "#2f002f"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    category: antimatterCategory,
    state: "solid",
    density: 8000,
    hardness: 0.8,
    conduct: 1,
    temp: 20,
    reactions: {
        "neutron_receiver": { "elem1": null, "elem2": null, "func": annihilate }
    }
};

console.log("Antimatter fission elements added!");
