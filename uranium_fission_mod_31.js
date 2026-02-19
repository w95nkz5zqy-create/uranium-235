// Uranium-235 Fission Mod v27 - TWO types: mu-235 and u-235

var fissionCategory = "fission";

if (!elements.categories) {
    elements.categories = [];
}
if (!elements.categories.includes(fissionCategory)) {
    elements.categories.push(fissionCategory);
}

// Modified Uranium-235 - High melting point, 4 neutrons
elements.modified_uranium_235 = {
    color: ["#e0e0e0", "#d0d0d0", "#c8c8c8", "#b8b8b8"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Max out temperature at 10000°C
        if (pixel.temp > 10000) {
            pixel.temp = 10000;
        }
        
        // Check adjacent pixels for neutrons
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel && nearPixel.element === "neutron") {
                        deletePixel(nx, ny);
                        
                        // Create 4 neutrons
                        for (var i = 0; i < 4; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("neutron", spawnX, spawnY);
                            }
                        }
                        
                        pixel.temp += 800;  // 800°C per fission!
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
    tempHigh: 10590,  // High melting point
    stateHigh: "molten_modified_uranium_235",
    hidden: false
};

elements.molten_modified_uranium_235 = {
    color: ["#ff8c00", "#ffa500", "#ff7f00", "#ffaa00"],
    behavior: behaviors.MOLTEN,
    tick: function(pixel) {
        // Max out temperature at 10000°C
        if (pixel.temp > 10000) {
            pixel.temp = 10000;
        }
    },
    category: fissionCategory,
    state: "liquid",
    density: 17300,
    conduct: 0.3,
    temp: 10600,
    tempLow: 10590,
    stateLow: "modified_uranium_235",
    hidden: false
};

// Uranium-235 - Normal melting point, 3 neutrons
elements.uranium_235 = {
    color: ["#c0c0c0", "#a8a8a8", "#b5b5b5", "#9d9d9d"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Check adjacent pixels for neutrons
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var nearPixel = pixelMap[nx][ny];
                    
                    if (nearPixel && nearPixel.element === "neutron") {
                        deletePixel(nx, ny);
                        
                        // Create 3 neutrons
                        for (var i = 0; i < 3; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var dist = 2 + Math.random() * 2;
                            var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                            var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                            
                            if (isEmpty(spawnX, spawnY)) {
                                createPixel("neutron", spawnX, spawnY);
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
    tempHigh: 3500,  // Lower melting point
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

// Moderator - Light grey, passable, slows neutrons AND protons once, doesn't get destroyed
elements.moderator = {
    color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],  // Empty behavior - lets everything pass through!
    passable: true,
    noMix: true,  // Won't mix with other elements
    tick: function(pixel) {
        // Check for neutrons and protons nearby
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                var nx = pixel.x + dx;
                var ny = pixel.y + dy;
                
                if (pixelMap[nx] && pixelMap[nx][ny]) {
                    var particle = pixelMap[nx][ny];
                    
                    // Slow both neutrons and protons
                    if (particle && (particle.element === "neutron" || particle.element === "proton")) {
                        // Check if already slowed
                        if (!particle.slowed) {
                            particle.slowed = true;
                        }
                        // Don't delete the particle or moderator!
                    }
                }
            }
        }
    },
    category: fissionCategory,
    state: "solid",
    density: 1850,
    hardness: 0.9,  // High hardness so it doesn't break easily
    temp: 20,
    tempHigh: 3000,
    stateHigh: "molten_moderator",
    immobile: true
};

elements.molten_moderator = {
    color: ["#ff6600", "#ff7700", "#ff5500"],
    behavior: behaviors.MOLTEN,
    category: fissionCategory,
    state: "liquid",
    density: 1700,
    temp: 3100,
    tempLow: 3000,
    stateLow: "moderator"
};

// Modify neutron AND proton behavior to respect slowing
if (elements.neutron) {
    var originalNeutronTick = elements.neutron.tick;
    
    elements.neutron.tick = function(pixel) {
        // If slowed, skip some ticks to make it slower
        if (pixel.slowed) {
            if (!pixel.skipTicks) {
                pixel.skipTicks = 0;
            }
            pixel.skipTicks++;
            
            // Skip every other tick (moves at half speed)
            if (pixel.skipTicks % 2 === 0) {
                return;
            }
        }
        
        // Call original tick if it exists
        if (originalNeutronTick) {
            originalNeutronTick(pixel);
        }
    };
}

if (elements.proton) {
    var originalProtonTick = elements.proton.tick;
    
    elements.proton.tick = function(pixel) {
        // If slowed, skip some ticks to make it slower
        if (pixel.slowed) {
            if (!pixel.skipTicks) {
                pixel.skipTicks = 0;
            }
            pixel.skipTicks++;
            
            // Skip every other tick (moves at half speed)
            if (pixel.skipTicks % 2 === 0) {
                return;
            }
        }
        
        // Call original tick if it exists
        if (originalProtonTick) {
            originalProtonTick(pixel);
        }
    };
}

console.log('Uranium Fission v29 loaded!');
console.log('modified_uranium_235: melts at 10590°C, maxes at 10000°C, creates 4 neutrons, 800°C per fission');
console.log('uranium_235: melts at 3500°C, creates 3 neutrons, 300°C per fission');
console.log('moderator: passable, slows neutrons AND protons once, does not get destroyed');
