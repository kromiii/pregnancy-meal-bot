export const config = {
  SPREAD_SHEET_ID:
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID"),
  PERPLEXITY_APIKEY:
    PropertiesService.getScriptProperties().getProperty("PERPLEXITY_APIKEY"),
  LINE_ACCESS_TOKEN:
    PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN"),
  OPENAI_APIKEY:
    PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY"),
};
