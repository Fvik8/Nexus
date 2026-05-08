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
    id: "gpu-1", name: "NEXUS RTX 5090 Ti Phantom", brand: "NVIDIA", category: "GPU", price: 2899, img: "🎮", hot: true,
    specs: { vram: "32GB GDDR7", clock: "2.8 GHz", tdp: "450W" }
  },
  { 
    id: "gpu-2", name: "ROG Strix RTX 5080 Gaming", brand: "NVIDIA", category: "GPU", price: 1199, img: "🎮", hot: true,
    specs: { vram: "16GB GDDR7", clock: "2.6 GHz", tdp: "320W" }
  },
  { 
    id: "gpu-3", name: "AORUS Master RX 7900 XTX", brand: "AMD", category: "GPU", price: 949, img: "🎮", hot: false,
    specs: { vram: "24GB GDDR6", clock: "2.5 GHz", tdp: "355W" }
  },
  { 
    id: "gpu-4", name: "MSI Suprim X RTX 4090", brand: "NVIDIA", category: "GPU", price: 1999, img: "🎮", hot: false,
    specs: { vram: "24GB GDDR6X", clock: "2.6 GHz", tdp: "450W" }
  },
  { 
    id: "gpu-5", name: "SAPPHIRE Nitro+ RX 7900 XT", brand: "AMD", category: "GPU", price: 799, img: "🎮", hot: false,
    specs: { vram: "20GB GDDR6", clock: "2.4 GHz", tdp: "315W" }
  },
  { 
    id: "gpu-6", name: "NEXUS Arc A770 Ultra", brand: "Intel", category: "GPU", price: 349, img: "🎮", hot: false,
    specs: { vram: "16GB GDDR6", clock: "2.1 GHz", tdp: "225W" }
  },

  // CPUs
  { 
    id: "cpu-1", name: "Intel Core Ultra 9 285K", brand: "Intel", category: "CPU", price: 589, img: "⚡", hot: true,
    specs: { cores: "24 (8P+16E)", clock: "5.7 GHz", tdp: "125W", socket: "LGA1851" }
  },
  { 
    id: "cpu-2", name: "AMD Ryzen 9 9950X", brand: "AMD", category: "CPU", price: 649, img: "⚡", hot: true,
    specs: { cores: "16", clock: "5.7 GHz", tdp: "170W", socket: "AM5" }
  },
  { 
    id: "cpu-3", name: "AMD Ryzen 7 7800X3D", brand: "AMD", category: "CPU", price: 449, img: "⚡", hot: true,
    specs: { cores: "8", clock: "5.0 GHz", tdp: "120W", socket: "AM5" }
  },
  { 
    id: "cpu-4", name: "Intel Core i9-14900K", brand: "Intel", category: "CPU", price: 549, img: "⚡", hot: false,
    specs: { cores: "24", clock: "6.0 GHz", tdp: "125W", socket: "LGA1700" }
  },
  { 
    id: "cpu-5", name: "Intel Core i7-14700K", brand: "Intel", category: "CPU", price: 399, img: "⚡", hot: false,
    specs: { cores: "20", clock: "5.6 GHz", tdp: "125W", socket: "LGA1700" }
  },
  { 
    id: "cpu-6", name: "AMD Ryzen 5 9600X", brand: "AMD", category: "CPU", price: 279, img: "⚡", hot: false,
    specs: { cores: "6", clock: "5.4 GHz", tdp: "65W", socket: "AM5" }
  },

  // Motherboards
  { 
    id: "mb-1", name: "ROG Maximus Z890 Apex", brand: "ASUS", category: "Motherboards", price: 699, img: "🏗️", hot: true,
    specs: { socket: "LGA1851", capacity: "Dual-Slot OC" }
  },
  { 
    id: "mb-2", name: "X870E AORUS XTREME", brand: "GIGABYTE", category: "Motherboards", price: 599, img: "🏗️", hot: true,
    specs: { socket: "AM5", capacity: "PCIe 5.0 x16" }
  },
  { 
    id: "mb-3", name: "MSI MEG Z790 GODLIKE", brand: "MSI", category: "Motherboards", price: 1199, img: "🏗️", hot: false,
    specs: { socket: "LGA1700", capacity: "M-Vision Dashboard" }
  },
  { 
    id: "mb-4", name: "ASRock X670E Taichi Carrara", brand: "ASRock", category: "Motherboards", price: 499, img: "🏗️", hot: false,
    specs: { socket: "AM5", capacity: "E-ATX Marble" }
  },
  { 
    id: "mb-5", name: "ROG Crosshair X670E Hero", brand: "ASUS", category: "Motherboards", price: 649, img: "🏗️", hot: false,
    specs: { socket: "AM5", capacity: "DDR5-8000+" }
  },
  { 
    id: "mb-6", name: "NEXUS Pro Z890 Creator", brand: "NEXUS", category: "Motherboards", price: 449, img: "🏗️", hot: false,
    specs: { socket: "LGA1851", capacity: "Triple 10G LAN" }
  },

  // RAM
  { 
    id: "ram-1", name: "Dominator Titanium 64GB", brand: "Corsair", category: "RAM", price: 399, img: "🧠", hot: true,
    specs: { capacity: "64GB (2x32)", speed: "8000 MT/s" }
  },
  { 
    id: "ram-2", name: "G.Skill Trident Z5 RGB", brand: "G.Skill", category: "RAM", price: 189, img: "🧠", hot: true,
    specs: { capacity: "32GB (2x16)", speed: "7200 MT/s" }
  },
  { 
    id: "ram-3", name: "TeamGroup T-Force Delta", brand: "TeamGroup", category: "RAM", price: 159, img: "🧠", hot: false,
    specs: { capacity: "32GB (2x16)", speed: "6400 MT/s" }
  },
  { 
    id: "ram-4", name: "Kingston FURY Renegade", brand: "Kingston", category: "RAM", price: 219, img: "🧠", hot: false,
    specs: { capacity: "48GB (2x24)", speed: "7600 MT/s" }
  },
  { 
    id: "ram-5", name: "Crucial Pro Overclocking", brand: "Crucial", category: "RAM", price: 129, img: "🧠", hot: false,
    specs: { capacity: "32GB (2x16)", speed: "6000 MT/s" }
  },
  { 
    id: "ram-6", name: "NEXUS Hyper-X 128GB", brand: "NEXUS", category: "RAM", price: 599, img: "🧠", hot: false,
    specs: { capacity: "128GB (4x32)", speed: "6400 MT/s" }
  },

  // Cooling
  { 
    id: "cool-1", name: "NEXUS Cryo-Flow Gen 5", brand: "NEXUS", category: "Cooling", price: 249, img: "❄️", hot: true,
    specs: { tdp: "350W", capacity: "420mm AIO" }
  },
  { 
    id: "cool-2", name: "Kraken Elite 360", brand: "NZXT", category: "Cooling", price: 279, img: "❄️", hot: true,
    specs: { capacity: "360mm AIO", clock: "LCD Display" }
  },
  { 
    id: "cool-3", name: "Noctua NH-D15 G2", brand: "Noctua", category: "Cooling", price: 149, img: "❄️", hot: false,
    specs: { tdp: "250W", capacity: "Dual Tower Air" }
  },
  { 
    id: "cool-4", name: "ASUS ROG Ryujin III", brand: "ASUS", category: "Cooling", price: 349, img: "❄️", hot: false,
    specs: { capacity: "360mm AIO", clock: "3.5\" LCD" }
  },
  { 
    id: "cool-5", name: "Lian Li Galahad II LCD", brand: "Lian Li", category: "Cooling", price: 289, img: "❄️", hot: false,
    specs: { capacity: "360mm AIO", clock: "IPS Display" }
  },
  { 
    id: "cool-6", name: "Dark Rock Pro 5", brand: "be quiet!", category: "Cooling", price: 99, img: "❄️", hot: false,
    specs: { tdp: "270W", capacity: "Silent Air" }
  },

  // Cases
  { 
    id: "case-1", name: "NEXUS Obsidian Zero-G", brand: "NEXUS", category: "Cases", price: 359, img: "📦", hot: true,
    specs: { capacity: "Full Tower", clock: "Gravity Support" }
  },
  { 
    id: "case-2", name: "Lian Li O11 Vision", brand: "Lian Li", category: "Cases", price: 149, img: "📦", hot: true,
    specs: { capacity: "Mid Tower Dual Chamber" }
  },
  { 
    id: "case-3", name: "Hyte Y70 Touch", brand: "Hyte", category: "Cases", price: 359, img: "📦", hot: true,
    specs: { capacity: "Integrated 4K Touch Screen" }
  },
  { 
    id: "case-4", name: "Fractal North XL", brand: "Fractal Design", category: "Cases", price: 199, img: "📦", hot: false,
    specs: { capacity: "Mid Tower Wood Trim" }
  },
  { 
    id: "case-5", name: "NZXT H9 Elite", brand: "NZXT", category: "Cases", price: 239, img: "📦", hot: false,
    specs: { capacity: "Dual Chamber" }
  },
  { 
    id: "case-6", name: "Corsair 7000D AIRFLOW", brand: "Corsair", category: "Cases", price: 269, img: "📦", hot: false,
    specs: { capacity: "Full Tower XL" }
  },
];
