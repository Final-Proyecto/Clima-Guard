const BASE_URL = "https://apis.datos.gob.ar/georef/api";

export interface Provincia {
  id: string;
  nombre: string;
}
export interface Localidad {
  id?: string;
  nombre: string;
  provincia: {
    id?: string;
    nombre: string;
  };
}

export const getProvincias = async (): Promise<Provincia[]> => {
  try {
    const response = await fetch(`${BASE_URL}/provincias`);
    if (!response.ok) throw new Error("No se pudieron obtener las provincias");
    const data = await response.json();
    return data.provincias || [];
  } catch (error) {
    console.error("Error en getProvincias:", error);
    return [];
  }
};

/**
 * @param provinciaNombre Nombre exacto de la provincia (ej: "Buenos Aires")
 */
export const getLocalidades = async (
  provinciaNombre: string
): Promise<Localidad[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/localidades?provincia=${encodeURIComponent(
        provinciaNombre
      )}&max=500`
    );
    if (!response.ok) throw new Error("No se pudieron obtener las localidades");
    const data = await response.json();
    return data.localidades || [];
  } catch (error) {
    console.error("Error en getLocalidades:", error);
    return [];
  }
};
