// Control Rods and Absorbers Mod for Sandboxels
// Compatible with Steam version on M4 Mac

var fissionCategory = "fission";

if (!elements.categories) {
    elements.categories = [];
}
if (!elements.categories.includes(fissionCategory)) {
    elements.categories.push(fissionCategory);
}

// Control Rods - absorb neutrons and protons
elements.control_rod = {
    color: ["#2c2c2c", "#383838", "#303030", "#3a3a3a"],
    behavior: behaviors.WALL,
    reactions: {
        "neutron": { "elem1": "control_rod", "elem2": null, "chance": 0.95 },
        "proton": { "elem1": "control_rod", "elem2": null, "chance": 0.95 }
    },
    category: fissionCategory,
    state: "solid",
    density: 10200,
    hardness: 0.8,
    conduct: 0.5,
    temp: 20,
    tempHigh: 2750,
    stateHigh: "molten_control_rod",
    hidden: false
};

elements.molten_control_rod = {
    color: ["#ff4500", "#ff5500", "#ff6000", "#ff5a00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "neutron": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 },
        "proton": { "elem1": "molten_control_rod", "elem2": null, "chance": 0.85 }
    },
    category: fissionCategory,
    state: "liquid",
    density: 9500,
    conduct: 0.6,
    temp: 2800,
    tempLow: 2750,
    stateLow: "control_rod",
    hidden: false
};

// Hydrogen Absorber - absorbs hydrogen and funnels it into pipes
elements.hydrogen_absorber = {
    color: ["#4169e1", "#4682b4", "#5f9ea0", "#6495ed"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Check for adjacent hydrogen to absorb and funnel to pipes
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var checkX = pixel.x + dx;
                var checkY = pixel.y + dy;
                
                if (!isEmpty(checkX, checkY, true)) {
                    var nearPixel = pixelMap[checkX][checkY];
                    
                    // If we find hydrogen, try to move it to a pipe
                    if (nearPixel && nearPixel.element === "hydrogen") {
                        // Look for adjacent pipes to funnel the hydrogen into
                        for (var pdx = -1; pdx <= 1; pdx++) {
                            for (var pdy = -1; pdy <= 1; pdy++) {
                                var pipeX = pixel.x + pdx;
                                var pipeY = pixel.y + pdy;
                                
                                if (!isEmpty(pipeX, pipeY, true)) {
                                    var pipePixel = pixelMap[pipeX][pipeY];
                                    if (pipePixel && pipePixel.element === "pipe") {
                                        // Delete the hydrogen
                                        deletePixel(checkX, checkY);
                                        // Create hydrogen inside the pipe
                                        if (isEmpty(pipeX, pipeY)) {
                                            createPixel("hydrogen", pipeX, pipeY);
                                        }
                                        return;
                                    }
                                }
                            }
                        }
                        // If no pipe found, just absorb it
                        if (Math.random() < 0.9) {
                            deletePixel(checkX, checkY);
                        }
                    }
                }
            }
        }
    },
    reactions: {
        "hydrogen": { "elem1": "hydrogen_absorber", "elem2": null, "chance": 0.9 },
        "steam": { "elem1": "hydrogen_absorber", "elem2": null, "chance": 0.3 }
    },
    category: fissionCategory,
    state: "solid",
    density: 8900,
    hardness: 0.7,
    conduct: 0.4,
    temp: 20,
    tempHigh: 1800,
    stateHigh: "molten_hydrogen_absorber",
    hidden: false
};

elements.molten_hydrogen_absorber = {
    color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "hydrogen": { "elem1": "molten_hydrogen_absorber", "elem2": null, "chance": 0.7 }
    },
    category: fissionCategory,
    state: "liquid",
    density: 8200,
    conduct: 0.5,
    temp: 1850,
    tempLow: 1800,
    stateLow: "hydrogen_absorber",
    hidden: false
};
