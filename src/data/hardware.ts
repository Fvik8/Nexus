import { Product } from '../store/useNexusStore';

export interface HardwareItem extends Product {
  brand: string;
  specs?: {
    vram?: string;
    clock?: string;
    cores?: string;
    tdp?: string;
    capacity?: string;
    speed?: string;
    socket?: string;
  };
}

export const HARDWARE_CATALOG: HardwareItem[] = [
  // GPUs
  { 
    id: "gpu-1", name: "NEXUS RTX 5090 Ti Phantom", brand: "NVIDIA", category: "GPU", price: 2899, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Gpu%20NEXUS%20RTX%205090%20Ti%20Phantom.png", hot: true,
    specs: { vram: "32GB GDDR7", clock: "2.8 GHz", tdp: "450W" }
  },
  { 
    id: "gpu-2", name: "ROG Strix RTX 5080 Gaming", brand: "NVIDIA", category: "GPU", price: 1199, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Gpu%20ROG%20Strix%20RTX%205080%20Gaming.png", hot: true,
    specs: { vram: "16GB GDDR7", clock: "2.6 GHz", tdp: "320W" }
  },
  { 
    id: "gpu-3", name: "AORUS Master RX 7900 XTX", brand: "AMD", category: "GPU", price: 949, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Gpu%20AORUS%20Master%20RX%207900%20XTX.png", hot: false,
    specs: { vram: "24GB GDDR6", clock: "2.5 GHz", tdp: "355W" }
  },
  { 
    id: "gpu-4", name: "MSI Suprim X RTX 4090", brand: "NVIDIA", category: "GPU", price: 1999, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Gpu%20MSI%20Suprim%20X%20RTX%204090.png", hot: false,
    specs: { vram: "24GB GDDR6X", clock: "2.6 GHz", tdp: "450W" }
  },
  { 
    id: "gpu-5", name: "SAPPHIRE Nitro+ RX 7900 XT", brand: "AMD", category: "GPU", price: 799, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Gpu%20SAPPHIRE%20Nitro%2B%20RX%207900%20XT.png", hot: false,
    specs: { vram: "20GB GDDR6", clock: "2.4 GHz", tdp: "315W" }
  },
  { 
    id: "gpu-6", name: "NEXUS Arc A770 Ultra", brand: "Intel", category: "GPU", price: 349, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Gpu%20NEXUS%20Arc%20A770%20Ultra.png", hot: false,
    specs: { vram: "16GB GDDR6", clock: "2.1 GHz", tdp: "225W" }
  },

  // CPUs
  { 
    id: "cpu-1", name: "Intel Core Ultra 9 285K", brand: "Intel", category: "CPU", price: 589, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Cpu%20Intel%20Core%20Ultra%209%20285K.png", hot: true,
    specs: { cores: "24 (8P+16E)", clock: "5.7 GHz", tdp: "125W", socket: "LGA1851" }
  },
  { 
    id: "cpu-2", name: "AMD Ryzen 9 9950X", brand: "AMD", category: "CPU", price: 649, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Cpu%20AMD%20Ryzen%209%209950X3D.png", hot: true,
    specs: { cores: "16", clock: "5.7 GHz", tdp: "170W", socket: "AM5" }
  },
  { 
    id: "cpu-3", name: "AMD Ryzen 7 7800X3D", brand: "AMD", category: "CPU", price: 449, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Cpu%20AMD%20Ryzen%207%207800X3D.png", hot: true,
    specs: { cores: "8", clock: "5.0 GHz", tdp: "120W", socket: "AM5" }
  },
  { 
    id: "cpu-4", name: "Intel Core i9-14900K", brand: "Intel", category: "CPU", price: 549, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Cpu%20Intel%20Core%20i9-14900K.png", hot: false,
    specs: { cores: "24", clock: "6.0 GHz", tdp: "125W", socket: "LGA1700" }
  },
  { 
    id: "cpu-5", name: "Intel Core i7-14700K", brand: "Intel", category: "CPU", price: 399, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Cpu%20Intel%20Core%20i7-14700K.png", hot: false,
    specs: { cores: "20", clock: "5.6 GHz", tdp: "125W", socket: "LGA1700" }
  },
  { 
    id: "cpu-6", name: "NEXUS Quantum X", brand: "NEXUS", category: "CPU", price: 999, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Cpu%20NEXUS%20Quantum%20X.png", hot: false,
    specs: { cores: "32", clock: "6.2 GHz", tdp: "250W", socket: "LGA1851" }
  },

  // Motherboards
  { 
    id: "mb-1", name: "ROG Maximus Z890 Apex", brand: "ASUS", category: "Motherboards", price: 699, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Mobo%20ASUS%20ROG%20Maximus%20Z890%20Apex.png", hot: true,
    specs: { socket: "LGA1851", capacity: "Dual-Slot OC" }
  },
  { 
    id: "mb-2", name: "X870E AORUS XTREME", brand: "GIGABYTE", category: "Motherboards", price: 599, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Mobo%20GIGABYTE%20X670E%20AORUS%20Master.png", hot: true,
    specs: { socket: "AM5", capacity: "PCIe 5.0 x16" }
  },
  { 
    id: "mb-3", name: "MSI MEG X870E GODLIKE", brand: "MSI", category: "Motherboards", price: 1199, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Mobo%20MSI%20MEG%20X870E%20GODLIKE.png", hot: false,
    specs: { socket: "AM5", capacity: "M-Vision Dashboard" }
  },
  { 
    id: "mb-4", name: "ASRock Z790 Taichi", brand: "ASRock", category: "Motherboards", price: 499, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Mobo%20ASRock%20Z790%20Taichi.png", hot: false,
    specs: { socket: "LGA1700", capacity: "E-ATX" }
  },
  { 
    id: "mb-5", name: "ROG Strix Z790-F Gaming", brand: "ASUS", category: "Motherboards", price: 649, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Mobo%20ASUS%20ROG%20Strix%20Z790-F%20Gaming.png", hot: false,
    specs: { socket: "LGA1700", capacity: "DDR5-8000+" }
  },
  { 
    id: "mb-6", name: "NEXUS Vector Z890 Pro", brand: "NEXUS", category: "Motherboards", price: 449, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Mobo%20NEXUS%20Vector%20Z890.png", hot: false,
    specs: { socket: "LGA1851", capacity: "Triple 10G LAN" }
  },

  // RAM
  { 
    id: "ram-1", name: "Dominator Titanium 64GB", brand: "Corsair", category: "RAM", price: 399, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Ram%20Corsair%20Dominator%20Titanium%20DDR5.png", hot: true,
    specs: { capacity: "64GB (2x32)", speed: "8000 MT/s" }
  },
  { 
    id: "ram-2", name: "G.Skill Trident Z5 RGB", brand: "G.Skill", category: "RAM", price: 189, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Ram%20G.Skill%20Trident%20Z5%20RGB.png", hot: true,
    specs: { capacity: "32GB (2x16)", speed: "7200 MT/s" }
  },
  { 
    id: "ram-3", name: "TeamGroup T-Force Delta", brand: "TeamGroup", category: "RAM", price: 159, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Ram%20TeamGroup%20T-Force%20Delta%20RGB.png", hot: false,
    specs: { capacity: "32GB (2x16)", speed: "6400 MT/s" }
  },
  { 
    id: "ram-4", name: "Kingston FURY Renegade", brand: "Kingston", category: "RAM", price: 219, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Ram%20Kingston%20FURY%20Renegade%20RGB.png", hot: false,
    specs: { capacity: "48GB (2x24)", speed: "7600 MT/s" }
  },
  { 
    id: "ram-5", name: "NEXUS Prism DDR5", brand: "NEXUS", category: "RAM", price: 299, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Ram%20NEXUS%20Prism%20DDR5.png", hot: false,
    specs: { capacity: "32GB (2x16)", speed: "8400 MT/s" }
  },
  { 
    id: "ram-6", name: "NEXUS Stealth", brand: "NEXUS", category: "RAM", price: 199, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Ram%20NEXUS%20Stealth.png", hot: false,
    specs: { capacity: "32GB (2x16)", speed: "7600 MT/s" }
  },

  // Cooling (Бележка: В GitHub имената са "Coolin")
  { 
    id: "cool-1", name: "Arctic Liquid Freezer III 360", brand: "Arctic", category: "Cooling", price: 119, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Coolin%20Arctic%20Liquid%20Freezer%20III%20360%20AIO.png", hot: true,
    specs: { tdp: "350W", capacity: "360mm AIO" }
  },
  { 
    id: "cool-2", name: "Kraken Elite 360", brand: "NZXT", category: "Cooling", price: 279, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Coolin%20NZXT%20Kraken%20Elite%20360%20mm%20AIO.png", hot: true,
    specs: { capacity: "360mm AIO", clock: "LCD Display" }
  },
  { 
    id: "cool-3", name: "Noctua NH-D15 G2", brand: "Noctua", category: "Cooling", price: 149, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Coolin%20Noctua%20NH-D15%20chromax.black.png", hot: false,
    specs: { tdp: "250W", capacity: "Dual Tower Air" }
  },
  { 
    id: "cool-4", name: "Lian Li Galahad II LCD", brand: "Lian Li", category: "Cooling", price: 289, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Coolin%20Lian%20Li%20Galahad%20II%20LCD%20360mm%20AIO.png", hot: false,
    specs: { capacity: "360mm AIO", clock: "IPS Display" }
  },
  { 
    id: "cool-5", name: "NEXUS Frostflow 360", brand: "NEXUS", category: "Cooling", price: 199, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Coolin%20NEXUS%20Frostflow%20360mm%20AIO.png", hot: false,
    specs: { capacity: "360mm AIO", clock: "RGB" }
  },
  { 
    id: "cool-6", name: "NEXUS Stealth Flow", brand: "NEXUS", category: "Cooling", price: 89, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Coolin%20NEXUS%20Stealth%20Flow.png", hot: false,
    specs: { tdp: "200W", capacity: "Silent Air" }
  },

  // Cases
  { 
    id: "case-1", name: "Lian Li O11 Dynamic EVO", brand: "Lian Li", category: "Cases", price: 169, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Case%20Lian%20Li%20O11%20Dynamic%20EVO%20RGB.png", hot: true,
    specs: { capacity: "Mid Tower Dual Chamber" }
  },
  { 
    id: "case-2", name: "Hyte Y70 Touch", brand: "Hyte", category: "Cases", price: 359, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Case%20Hyte%20Y70%20Touch.png", hot: true,
    specs: { capacity: "Integrated 4K Touch Screen" }
  },
  { 
    id: "case-3", name: "Fractal Design North", brand: "Fractal Design", category: "Cases", price: 139, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Case%20Fractal%20Design%20North.png", hot: true,
    specs: { capacity: "Mid Tower Wood Trim" }
  },
  { 
    id: "case-4", name: "NZXT H9 Elite", brand: "NZXT", category: "Cases", price: 239, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Case%20NZXT%20H9%20Elite.png", hot: false,
    specs: { capacity: "Dual Chamber" }
  },
  { 
    id: "case-5", name: "NEXUS Hyperspace", brand: "NEXUS", category: "Cases", price: 299, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Case%20NEXUS%20Hyperspace.png", hot: false,
    specs: { capacity: "Full Tower Curved Glass" }
  },
  { 
    id: "case-6", name: "NEXUS Stealth Mini", brand: "NEXUS", category: "Cases", price: 129, 
    img: "https://raw.githubusercontent.com/Fvik8/Nexus/main/Images/Case%20NEXUS%20Stealth%20Mini.png", hot: false,
    specs: { capacity: "ITX Small Form Factor" }
  },
];
