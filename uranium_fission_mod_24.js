// Uranium Fission Mod v24 - Advanced Neutron Physics
// Fast/slow neutrons, moderators, xenon-135 poisoning, modified U-235

var fissionCategory = "fission";

if (!elements.categories) {
    elements.categories = [];
}
if (!elements.categories.includes(fissionCategory)) {
    elements.categories.push(fissionCategory);
}

// FAST NEUTRONS - Cannot cause fission
elements.fast_neutron = {
    color: ["#ff00ff", "#ff00cc", "#ff00ee"],
    behavior: [
        "XX|M2%10|XX",
        "M2%10|XX|M2%10",
        "XX|M2%10|XX",
    ],
    category: fissionCategory,
    state: "energy",
    density: 0,
    temp: 20,
    hidden: false
};

// SLOW NEUTRONS - Can cause fission
elements.slow_neutron = {
    color: ["#00ffff", "#00ccff", "#00eeff"],
    behavior: [
        "XX|M1%20|XX",
        "M1%20|XX|M1%20",
        "XX|M1%20|XX",
    ],
    category: fissionCategory,
    state: "energy",
    density: 0,
    temp: 20,
    hidden: false
};

// MODERATOR - Slows down fast neutrons
elements.moderator = {
    color: ["#8b4513", "#a0522d", "#8b4513"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Check for fast neutrons nearby
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel.element === "fast_neutron") {
                        // Convert fast neutron to slow neutron
                        deletePixel(nx, ny);
                        createPixel("slow_neutron", nx, ny);
                        return;
                    }
                    // Slow neutrons pass through (do nothing)
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 1850,
    hardness: 0.7,
    temp: 20,
    hidden: false
};

// XENON-135 - Neutron poison, absorbs neutrons
elements.xenon_135 = {
    color: ["#00ff00", "#00ee00", "#00dd00"],
    behavior: behaviors.GAS,
    tick: function(pixel) {
        if (!pixel.neutronsAbsorbed) {
            pixel.neutronsAbsorbed = 0;
        }
        
        // Check for neutrons nearby
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel.element === "fast_neutron" || nearPixel.element === "slow_neutron") {
                        deletePixel(nx, ny);
                        pixel.neutronsAbsorbed++;
                        
                        // After absorbing 4 neutrons total (2 fast + 2 slow), disappear
                        if (pixel.neutronsAbsorbed >= 4) {
                            deletePixel(pixel.x, pixel.y);
                            return;
                        }
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "gas",
    density: 5.9,
    temp: 20,
    radioactive: true,
    hidden: false
};

// MODIFIED URANIUM-235 - Dark grey, higher melting point, better heat control
elements.modified_uranium_235 = {
    color: ["#404040", "#383838", "#484848"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Only react with SLOW neutrons
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel.element === "slow_neutron") {
                        deletePixel(nx, ny);
                        
                        // Create 3 fast neutrons
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("fast_neutron", spawnX, spawnY);
                            }
                        }
                        
                        // Create fission products
                        if (Math.random() < 0.3) {
                            var spawnX = pixel.x + (Math.random() < 0.5 ? 1 : -1);
                            var spawnY = pixel.y + (Math.random() < 0.5 ? 1 : -1);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                if (Math.random() < 0.1) {
                                    createPixel("xenon_135", spawnX, spawnY);
                                } else if (Math.random() < 0.5) {
                                    createPixel("barium_141", spawnX, spawnY);
                                } else {
                                    createPixel("krypton_92", spawnX, spawnY);
                                }
                            }
                        }
                        
                        // Add heat but cap at 8000°C
                        if (pixel.temp < 8000) {
                            pixel.temp += 800;
                            if (pixel.temp > 8000) {
                                pixel.temp = 8000;
                            }
                        }
                        return;
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 19100,
    hardness: 0.9,
    conduct: 0.27,
    temp: 20,
    tempHigh: 10000,
    stateHigh: "molten_modified_uranium_235",
    hidden: false
};

elements.molten_modified_uranium_235 = {
    color: ["#606060", "#585858", "#686868"],
    behavior: behaviors.MOLTEN,
    category: fissionCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.3,
    temp: 10100,
    tempLow: 10000,
    stateLow: "modified_uranium_235",
    hidden: false
};

// REGULAR URANIUM-235 - Now produces slow neutrons and fission products
elements.uranium_235 = {
    color: ["#c0c0c0", "#a8a8a8", "#b5b5b5", "#9d9d9d"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Only react with SLOW neutrons
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel.element === "slow_neutron") {
                        deletePixel(nx, ny);
                        
                        // Create 3 fast neutrons
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("fast_neutron", spawnX, spawnY);
                            }
                        }
                        
                        // Create fission products
                        if (Math.random() < 0.3) {
                            var spawnX = pixel.x + (Math.random() < 0.5 ? 1 : -1);
                            var spawnY = pixel.y + (Math.random() < 0.5 ? 1 : -1);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                if (Math.random() < 0.1) {
                                    createPixel("xenon_135", spawnX, spawnY);
                                } else if (Math.random() < 0.5) {
                                    createPixel("barium_141", spawnX, spawnY);
                                } else {
                                    createPixel("krypton_92", spawnX, spawnY);
                                }
                            }
                        }
                        
                        pixel.temp += 300;
                        return;
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.27,
    temp: 20,
    tempHigh: 3500,
    stateHigh: "molten_uranium_235",
    hidden: false
};

elements.molten_uranium_235 = {
    color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
    behavior: behaviors.MOLTEN,
    category: fissionCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.3,
    temp: 3600,
    tempLow: 3500,
    stateLow: "uranium_235",
    hidden: false
};

// Fission Products
elements.barium_141 = {
    color: ["#90ee90", "#98fb98", "#8fbc8f"],
    behavior: behaviors.MOLTEN,
    category: fissionCategory,
    state: "liquid",
    density: 3300,
    temp: 1000,
    tempLow: 700,
    stateLow: "barium_141_solid",
    radioactive: true,
    hidden: false
};

elements.barium_141_solid = {
    color: ["#6b8e23", "#808000", "#556b2f"],
    behavior: behaviors.POWDER,
    category: fissionCategory,
    state: "solid",
    density: 3510,
    temp: 20,
    tempHigh: 700,
    stateHigh: "barium_141",
    radioactive: true,
    hidden: false
};

elements.krypton_92 = {
    color: ["#e6e6fa", "#d8bfd8", "#dda0dd"],
    behavior: behaviors.GAS,
    category: fissionCategory,
    state: "gas",
    density: 3.75,
    temp: 20,
    radioactive: true,
    hidden: false
};

// NEUTRON EMITTER - Fixed to emit slow neutrons
elements.neutron_emitter = {
    color: ["#ffff00", "#ffef00", "#ffe700"],
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
                    
                    if (pixelMap[cx] && pixelMap[cx][cy]) {
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
                    
                    if (pixelMap[checkX] && pixelMap[checkX][checkY]) {
                        var checkPixel = pixelMap[checkX][checkY];
                        if (checkPixel && checkPixel.element === "neutron_receiver") {
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
                    createPixel("slow_neutron", emitX, emitY);
                }
            } else {
                if (isEmpty(pixel.x + 1, pixel.y)) {
                    createPixel("slow_neutron", pixel.x + 1, pixel.y);
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 8000,
    hardness: 0.8,
    temp: 20,
    hidden: false
};

elements.neutron_receiver = {
    color: ["#00ff00", "#00ef00", "#00e700"],
    behavior: behaviors.WALL,
    noMix: true,
    immobile: true,
    category: fissionCategory,
    state: "solid",
    density: 8000,
    hardness: 0.8,
    conduct: 1,
    temp: 20,
    hidden: false
};

// Control Rods - absorb all neutron types
elements.control_rod = {
    color: ["#4a4a4a", "#3a3a3a", "#5a5a5a"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    if (nearPixel && (nearPixel.element === "fast_neutron" || nearPixel.element === "slow_neutron")) {
                        if (Math.random() < 0.95) {
                            deletePixel(nx, ny);
                            return;
                        }
                    }
                }
            }
        }
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
    color: ["#ff6600", "#ff8800", "#ff7700"],
    behavior: behaviors.MOLTEN,
    category: fissionCategory,
    state: "liquid",
    density: 9500,
    conduct: 0.6,
    temp: 2800,
    tempLow: 2750,
    stateLow: "control_rod",
    hidden: false
};

// Make E-Superheater immobile
if (elements.e_superheater) {
    elements.e_superheater.immobile = true;
    elements.e_superheater.movable = false;
}

console.log("Uranium Fission Mod v24 loaded - Advanced neutron physics!");
