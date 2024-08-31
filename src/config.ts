export const config = {
  LINE_ACCESS_TOKEN:
    PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN"),
  OPENAI_API_KEY:
    PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY"),
};
