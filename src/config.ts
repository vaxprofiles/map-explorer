import type {
  AppConfig,
} from "./types.ts"

//export const appConfig: AppConfig = {
//  kind: "geojson-datafile",
//  mapDescription: {
//    title: "Historical disease mention rates",
//    description: `This map contains data gathered via Delpher and processed by the ODISSEI SoDa team. Each
//        municipality gets a "mention rate" assigned, which is a proxy for the actual disease
//        pressure in this region. See
//        <a
//          href="https://github.com/sodascience/disease_database"
//          target="_blank"
//          rel="noopener noreferrer"
//          class="underline"
//        >
//          https://github.com/sodascience/disease_database
//        </a>.`
//  },
//  categoryColumns: ["year", "month", "disease"],
//  valueColumn: "mention_rate",
//  idColumnGeojson: "cbscode",
//  idColumnDataFile: "cbscode",
//  dataFileName: "disease_database_v1.2.parquet",
//  geojsonFileName: "nl1869.geojson",
//  legendTitle: "Mention Rate",
//  mapColorConfig: {
//    minValue: 0,
//    maxValue: 0.4,
//    colorScheme: "viridis",
//    dynamic: false,
//    colorSchemeInverted: false,
//  },
//  initialFiltering: {
//    "year": "1918",
//    "month": "10",
//    "disease": "influenza",
//  },
//}

export const map1: AppConfig = {
  kind: "geojson-datafile",
  mapDescription: {
    title: "Clickedy click",
    description: `banaan`
  },
  categoryColumns: ["A", "B"],
  valueColumn: "value",
  idColumnGeojson: "statcode",
  idColumnDataFile: "statcode",
  dataFileName: "dataset.csv",
  geojsonFileName: "nederland.geojson",
  legendTitle: "blala",
  mapColorConfig: {
    minValue: 1,
    maxValue: 100,
    colorScheme: "viridis",
    dynamic: false,
    colorSchemeInverted: false,
  },
}

export const map2: AppConfig = {
  kind: "geojson-datafile",
  mapDescription: {
    title: "Clickedy click",
    description: `banaan`
  },
  categoryColumns: ["A", "B"],
  valueColumn: "value",
  idColumnGeojson: "statcode",
  idColumnDataFile: "statcode",
  dataFileName: "dataset.csv",
  geojsonFileName: "nederland.geojson",
  legendTitle: "blala",
  mapColorConfig: {
    minValue: 1,
    maxValue: 100,
    colorScheme: "turbo",
    dynamic: false,
    colorSchemeInverted: false,
  },
}

export const appConfigs: AppConfig[] = [map1, map2]
