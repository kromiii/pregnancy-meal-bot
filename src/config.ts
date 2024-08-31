export const config = {
  PERPLEXITY_APIKEY:
    PropertiesService.getScriptProperties().getProperty("PERPLEXITY_APIKEY"),
  LINE_ACCESS_TOKEN:
    PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN"),
};
