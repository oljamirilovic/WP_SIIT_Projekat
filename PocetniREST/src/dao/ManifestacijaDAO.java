package dao;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
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
import beans.Manifestacija;
import beans.Pol;
import beans.TipManifestacije;

public class ManifestacijaDAO  {
	HashMap<String, Manifestacija> manifestacije;
	private String contextPath;
	
	public ManifestacijaDAO(LokacijaDAO lokacijaDAO, ProdavacDAO prodavacDAO) {
		this.manifestacije=new HashMap<>();
		try {
			parseJSON(lokacijaDAO, prodavacDAO);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void generateJSON() throws IOException {
		
			JsonFactory jsonFactory = new JsonFactory();
			JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File("manifestacije.json"), JsonEncoding.UTF8);
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Manifestacije");
			jsonGenerator.writeStartArray();
			for(Manifestacija k : manifestacije.values()) {
				jsonGenerator.writeStartObject();
				jsonGenerator.writeFieldName("Manifestacija");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("naziv", k.getNaziv()+"");
				jsonGenerator.writeStringField("brojMesta", k.getBrojMesta()+"");
				jsonGenerator.writeStringField("cena", k.getCenaKarte()+"");
				DateTimeFormatter formater=DateTimeFormatter.ofPattern("dd.MM.yyyy.");
				String dan=k.getDatumVreme().format(formater);
				jsonGenerator.writeStringField("datum", dan);
				
				jsonGenerator.writeEndObject(); 
		  	    jsonGenerator.writeEndObject();
		}
		
		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
        jsonGenerator.close();
		
	}
	
	public void parseJSON(LokacijaDAO lokacijaDAO, ProdavacDAO prodavacDAO) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File("manifestacije.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();

			
			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {
				
				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Manifestacija".equals(fieldName)) { 
				while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
					Manifestacija man=new Manifestacija();
					String nameField = jsonParser.getCurrentName();
					jsonParser.nextToken(); // move to value

					if ("naziv".equals(nameField)) {
						man.setNaziv(jsonParser.getText());

					} else if ("tip".equals(nameField)) {
						if("FESTIVAL".equals(jsonParser.getText())) {
							man.setTipManifestacije(TipManifestacije.FESTIVAL);
						}else if("KONCERT".equals(jsonParser.getText())) {
							man.setTipManifestacije(TipManifestacije.KONCERT);
						}else {
						man.setTipManifestacije(TipManifestacije.POZORISTE);}
					}else if ("brojMesta".equals(nameField)) {
						man.setBrojMesta(Integer.parseInt(jsonParser.getText()));
					}else if ("datumVreme".equals(nameField)) {
						DateTimeFormatter formater=DateTimeFormatter.ofPattern("dd.MM.yyyy.");
						LocalDateTime dan=LocalDateTime.parse(jsonParser.getText(), formater);
						man.setDatumVreme(dan);
					}else if ("cena".equals(nameField)) {
						man.setCenaKarte(Double.parseDouble(jsonParser.getText()));
					}else if ("status".equals(nameField)) {
						if("true".equals(jsonParser.getText())) {
							man.setStatus(true);
						}else {
							man.setStatus(false);
						}
					}
					else if ("izbrisana".equals(nameField)) {
						if("true".equals(jsonParser.getText())) {
							man.setIzbrisana(true);
						}else {
							man.setIzbrisana(false);
						}
					}
					
					man.setLokacija(lokacijaDAO.find(man.getNaziv()));
				this.manifestacije.put(man.getNaziv(), man);
				}
			} 
		}
				}}}
		jsonParser.close();

	}
		

	public Manifestacija find(String text) {
		if(manifestacije.containsKey(text)) {
			return manifestacije.get(text);
		}
		return null;
	}
	
	public Collection<Manifestacija> findAll() {
		return manifestacije.values();
	}

}
