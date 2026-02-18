// Neutron Types - FINAL FIX - Won't freeze game!

(function() {
    console.log('Neutron Types FINAL loading...');
    
    setTimeout(function() {
        if (typeof elements === 'undefined') {
            console.error('Elements not loaded');
            return;
        }
        
        console.log('Creating neutron types...');
        
        // Fast Neutron - Yellow, flies fast
        elements.fast_neutron = {
            color: "#ffff00",
            behavior: [
                "XX|M2 AND BO%10|XX",
                "M2 AND BO%10|XX|M2 AND BO%10",
                "XX|M2 AND BO%10|XX"
            ],
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // Slow Neutron - Orange, flies slower  
        elements.slow_neutron = {
            color: "#ff9900",
            behavior: [
                "XX|M2 AND BO%50|XX",
                "M2 AND BO%50|XX|M2 AND BO%50",
                "XX|M2 AND BO%50|XX"
            ],
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // Moderator - Light grey
        elements.moderator = {
            color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
            behavior: behaviors.WALL,
            reactions: {
                "neutron": { "elem1": "moderator", "elem2": "slow_neutron" },
                "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron" }
            },
            category: "solids",
            state: "solid",
            density: 1850,
            temp: 20,
            tempHigh: 3000,
            stateHigh: "molten_moderator"
        };
        
        elements.molten_moderator = {
            color: "#ff6600",
            behavior: behaviors.MOLTEN,
            category: "solids",
            state: "liquid",
            density: 1700,
            temp: 3100,
            tempLow: 3000,
            stateLow: "moderator"
        };
        
        console.log('Neutron types FINAL loaded successfully!');
    }, 500);
})();
