export const tourData = {
  sala: {
    id: 'sala',
    title: 'Sala / Comedor Principal',
    area: '45 m²',
    ambiance: '🛋️',
    details: 'Amplio espacio social con ventanales de piso a techo. Diseñado para reunir a toda la familia en un ambiente cálido e inspirador.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
    markers: [
      {
        id: 'marker-cocina',
        longitude: 0.2, // Radians or Degrees? For react-photo-sphere-viewer it uses math coordinates. Let's use radians or strings like '10deg'
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🍳</div></div>',
        targetNode: 'cocina',
        tooltip: 'Cocina',
      },
      {
        id: 'marker-pasillo',
        longitude: 1.57, // 90 degrees
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🚪</div></div>',
        targetNode: 'pasillo',
        tooltip: 'Pasillo Distribuidor',
      }
    ]
  },
  cocina: {
    id: 'cocina',
    title: 'Cocina Cerrada & Equipada',
    area: '18 m²',
    ambiance: '🍳',
    details: 'Gabinetes de melamina italiana, pisos de porcelana antideslizante y pre-instalación para campana extractora y lavavajillas.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere-test.jpg',
    markers: [
      {
        id: 'marker-sala',
        longitude: 3.14, // 180 degrees
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🛋️</div></div>',
        targetNode: 'sala',
        tooltip: 'Volver a Sala',
      }
    ]
  },
  pasillo: {
    id: 'pasillo',
    title: 'Pasillo Distribuidor',
    area: '8 m²',
    ambiance: '🚪',
    details: 'Pasillo amplio con piso laminado de roble natural. Conecta las áreas sociales con los dormitorios y el baño completo.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
    markers: [
      {
        id: 'marker-sala',
        longitude: -1.57,
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🛋️</div></div>',
        targetNode: 'sala',
        tooltip: 'Volver a Sala',
      },
      {
        id: 'marker-dormitorio',
        longitude: 1.0,
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🛏️</div></div>',
        targetNode: 'dormitorio',
        tooltip: 'Dormitorio Principal',
      },
      {
        id: 'marker-bano',
        longitude: 2.14,
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🛁</div></div>',
        targetNode: 'bano',
        tooltip: 'Baño Completo',
      }
    ]
  },
  dormitorio: {
    id: 'dormitorio',
    title: 'Dormitorio Principal',
    area: '28 m²',
    ambiance: '🛏️',
    details: 'Espacio para cama King size más walk-in closet integrado. Ventana orientada al este para disfrutar de la luz matutina.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere-test.jpg',
    markers: [
      {
        id: 'marker-pasillo',
        longitude: 3.14,
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🚪</div></div>',
        targetNode: 'pasillo',
        tooltip: 'Salir al Pasillo',
      }
    ]
  },
  bano: {
    id: 'bano',
    title: 'Baño Completo + Visita',
    area: '10 m²',
    ambiance: '🛁',
    details: 'Ducha con mampara de vidrio templado, grifería monocromática y acabado de mármol Carrara. Espacio spa en tu hogar.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
    markers: [
      {
        id: 'marker-pasillo',
        longitude: 3.14,
        latitude: 0,
        html: '<div class="custom-hotspot"><div class="hotspot-pulse"></div><div class="hotspot-icon">🚪</div></div>',
        targetNode: 'pasillo',
        tooltip: 'Salir al Pasillo',
      }
    ]
  }
}

export const nodeOrder = ['sala', 'cocina', 'pasillo', 'dormitorio', 'bano']

export const nodeShort = {
  sala: 'Sala',
  cocina: 'Cocina',
  pasillo: 'Pasillo',
  dormitorio: 'Dormitorio',
  bano: 'Baño'
}
