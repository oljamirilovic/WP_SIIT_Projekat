package dao;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
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

import beans.Karta;
import beans.Kupac;
import beans.Pol;
import beans.Prodavac;

public class KupacDAO implements Ucitavanje {
	HashMap<String, Kupac> kupci;
	private  String contextPath;


	public KupacDAO() {
		super();
		kupci=new HashMap<>();
		try {
			parseJSON();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public Collection<Kupac> findAll(){
		return kupci.values();
	}
	public Kupac addKupac(Kupac kupac) {
		if(find(kupac.getKorisnickoIme()) != null) {
			return null;
		}
		kupci.put(kupac.getKorisnickoIme(), kupac);
		return kupac;
	}
	public Kupac find(String korisnickoIme) {
		if(kupci.containsKey(korisnickoIme)) {
			return kupci.get(korisnickoIme);
		}return null;
	}
	@Override
	public void generateJSON() throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File("kupci.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Kupci");
		jsonGenerator.writeStartArray();

		for(Kupac k : kupci.values()) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Kupac");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("ime", k.getIme());
			jsonGenerator.writeStringField("prezime", k.getPrezime());
			jsonGenerator.writeStringField("lozinka", k.getLozinka());
			jsonGenerator.writeStringField("korisnickoIme", k.getKorisnickoIme());
			DateTimeFormatter formater=DateTimeFormatter.ofPattern("dd.MM.yyyy.");
			String dan=k.getDatumRodjenja().format(formater);
			jsonGenerator.writeStringField("datum", dan);
			jsonGenerator.writeStringField("pol", k.getPol().name());
			jsonGenerator.writeStringField("bododvi", k.getSakupljeniBodovi()+"");
			jsonGenerator.writeStringField("izbrisan", k.isIzbrisan()+"");
			jsonGenerator.writeStringField("blokiran", k.isBlokiran()+"");
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();}

	@Override
	public void parseJSON() throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File("kupci.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Admin".equals(fieldName)) { 
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								Kupac kupac=new Kupac();
								String nameField = jsonParser.getCurrentName();
								jsonParser.nextToken(); // move to value

								if ("korisnickoIme".equals(nameField)) {
									kupac.setKorisnickoIme(jsonParser.getText());

								} else if ("lozinka".equals(nameField)) {
									kupac.setLozinka(jsonParser.getText());
								}else if ("ime".equals(nameField)) {
									kupac.setIme(jsonParser.getText());
								}else if ("prezime".equals(nameField)) {
									kupac.setPrezime(jsonParser.getText());
								}else if ("pol".equals(nameField)) {
									if(jsonParser.getText().equals("MUSKI")) {
										kupac.setPol(Pol.MUSKI);}
									else {
										kupac.setPol(Pol.ZENSKI);	
									}
								}
								else if ("bodovi".equals(nameField)) {
									kupac.setSakupljeniBodovi(Integer.parseInt(jsonParser.getText()));
								}
								else if("blokiran".equals(nameField)){
									if("true".equals(jsonParser.getText())) {
										kupac.setBlokiran(true);
									}else {
										kupac.setBlokiran(false);
									}
								}
								else if("izbrisan".equals(nameField)){
									if("true".equals(jsonParser.getText())) {
										kupac.setIzbrisan(true);
									}else {
										kupac.setIzbrisan(false);
									}
								}else if("datum".equals(nameField)){
									DateTimeFormatter fo=DateTimeFormatter.ofPattern("dd.MM.yyyy.");
									LocalDate dan=LocalDate.parse(jsonParser.getText(), fo);
									kupac.setDatumRodjenja(dan);
								}
								this.kupci.put(kupac.getKorisnickoIme(), kupac);

							}
						} 
					}

				}
			}
		}
		jsonParser.close();

	}

}
