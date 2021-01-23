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

import beans.Administrator;
import beans.Karta;
import beans.Kupac;
import beans.Pol;
import beans.Prodavac;

public class KartaDAO {
	HashMap<String, Karta> karte;
	private String contextPath;

	public KartaDAO(ManifestacijaDAO manifestacijaDAO, KupacDAO kupacDAO) {
		this.karte=new HashMap<>();

		try {
			this.parseJSON(manifestacijaDAO,kupacDAO);
		} catch (JsonParseException e) {
			//TODO: nesto pametnije

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}


	}

	public Karta addKarta(Karta karta) {
		if(karte.containsKey(karta.getId())) {
			return null;
		}
		karte.put(karta.getId(), karta);
		return karta;
	}

	public Collection<Karta> findAll(){
		return karte.values();
	}

	public Karta find(String id) {
		if(karte.containsKey(id)) {
			return karte.get(id);
		}return null;
	}


	public  void generateJSON() throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File("karte.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Karte");
		jsonGenerator.writeStartArray();
		for(Karta k : karte.values()) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Karta");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("cena", k.getCena()+"");
			jsonGenerator.writeStringField("id", k.getId());
			jsonGenerator.writeStringField("manifestacija", k.getManifestacija().getNaziv());
			jsonGenerator.writeStringField("izbrisana", k.isIzbrisana()+"");
			DateTimeFormatter formater=DateTimeFormatter.ofPattern("dd.MM.yyyy.");
			String dan=k.getDatum().format(formater);
			jsonGenerator.writeStringField("datum", dan);
			jsonGenerator.writeStringField("status", k.isStatus()+"");
			jsonGenerator.writeStringField("kupac", k.getKupac().getKorisnickoIme());
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();


	}

	public void parseJSON(ManifestacijaDAO manifestacijaDAO, KupacDAO kupacDAO) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File("karte.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Karta".equals(fieldName)) { 
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								Karta karta=new Karta();
								String nameField = jsonParser.getCurrentName();
								jsonParser.nextToken(); // move to value

								if ("cena".equals(nameField)) {
									karta.setCena(Double.parseDouble(jsonParser.getText()));

								} else if ("id".equals(nameField)) {
									karta.setId(jsonParser.getText());
								}else if ("datum".equals(nameField)) {
									DateTimeFormatter formatter=DateTimeFormatter.ofPattern("dd.MM.yyyy."); 
									LocalDate dan=LocalDate.parse(jsonParser.getText(), formatter);
									karta.setDatum(dan);
								}else if ("izbrisana".equals(nameField)) {
									if(jsonParser.getText().equals("true")) {
										karta.setIzbrisana(true);
									}else {
										karta.setIzbrisana(false);	
									}
								}else if ("status".equals(nameField)) {
									if(jsonParser.getText().equals("true")) {
										karta.setStatus(true);
									}else {
										karta.setStatus(false);	
									}
								}
								else if ("kupac".equals(nameField)) {
									karta.setKupac(kupacDAO.find(jsonParser.getText()));
									Kupac k= (kupacDAO.find(jsonParser.getText()));
									k.addKarta(karta);
								}
								else if ("manifestacija".equals(nameField)) {
									karta.setManifestacija(manifestacijaDAO.find(jsonParser.getText()));

								}

								this.karte.put(karta.getId(), karta);
							}
						}
					}
				}
			} jsonParser.close();
		}
	}





}
