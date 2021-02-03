package dao;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonEncoding;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;

import beans.Administrator;
import beans.Karta;
import beans.Komentar;
import beans.Lokacija;


public class LokacijaDAO {
	//ne znam da li nam treba lista lokacija, ali nam treba DAo
	private HashMap<String, Lokacija> lokacije; //gde je kljuc je sifra manif
	private String contextPath;


	public LokacijaDAO() {
		super();
		lokacije=new HashMap<>();
		try {
			parseJSON("");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	public  void generateJSON(String contextpath) throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File(contextpath + "/data/lokacije.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Lokacije");
		jsonGenerator.writeStartArray();
		for(Lokacija l : lokacije.values()) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Lokacija");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("geografskaDuzina", l.getGeografskaDuzina()+"");
			jsonGenerator.writeStringField("geografskaSirina",l.getGeografskaSirina()+"");
			jsonGenerator.writeStringField("mesto", l.getMesto());
			jsonGenerator.writeStringField("postanskiBroj", l.getPostanskiBroj());
			jsonGenerator.writeStringField("broj", l.getBroj()+"");
			jsonGenerator.writeStringField("ulica",l.getUlica()+"");
			//jsonGenerator.writeStringField("manifestacijaId", l.t+""); //TODO: mora ovde nekako da se dobavi id manifestacije??
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();
	}


	private void ucitavanjeSlike() {}

	public void parseJSON(String contextpath) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File(contextpath + "/data/lokacije.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Lokacija".equals(fieldName)) {
							Lokacija lokacija=new Lokacija();
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								
								String nameField = jsonParser.getCurrentName();
								jsonParser.nextToken(); // move to value

								if ("geografskaDuzina".equals(nameField)) {
									lokacija.setGeografskaDuzina(Double.parseDouble(jsonParser.getText()));

								} else if ("geografskaSirina".equals(nameField)) {
									lokacija.setGeografskaSirina(Double.parseDouble(jsonParser.getText()));
								}else if ("mesto".equals(nameField)) {
									lokacija.setMesto(jsonParser.getText());
								}else if ("postanskiBroj".equals(nameField)) {
									lokacija.setPostanskiBroj(jsonParser.getText());
								}else if ("broj".equals(nameField)) {
									lokacija.setBroj(jsonParser.getText());
								}
								else if ("ulica".equals(nameField)) {
									lokacija.setUlica(jsonParser.getText());
								}
								else if("manifestacijaId".equals(nameField)){
									this.lokacije.put(jsonParser.getText(), lokacija);
								}
							}
						} 
					}
				}}}
		jsonParser.close();

	}

	public Lokacija find(String naziv) {
		if(lokacije.containsKey(naziv)) {
			return lokacije.get(naziv);
		}
		return null;
	}

}
