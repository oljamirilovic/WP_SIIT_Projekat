package dao;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import beans.Manifestacija;
import beans.Prodavac;

public class KartaDAO {
	HashMap<String, Karta> karte;
	private String contextPath;

	public KartaDAO(String contextpath) {
		this.karte=new HashMap<>();
		try {
			parseJSON(contextpath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}

	public HashMap<String, Karta> getKarte() {
		return karte;
	}

	public void setKarte(HashMap<String, Karta> karte) {
		this.karte = karte;
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}

	public Karta addKarta(Karta karta) {
		if(karte.containsKey(karta.getId())) {
			return null;
		}
		karte.put(karta.getId(), karta);
		return karta;
	}
	
	public Collection<Karta> searchCustomer(String name){
		Collection<Karta> ret = new ArrayList<Karta>();
		for (Karta k : karte.values()) {
			if(k.getKorisnickoIme().equals(name)) {
				ret.add(k);
			}
		}
		return ret;
	}
	
	public Collection<Karta> findAll(){
		return karte.values();
	}
	
	public void updateOne(Karta m) {
		this.karte.put(m.getId(), m);
	}

	public Karta find(String id) {
		if(karte.containsKey(id)) {
			return karte.get(id);
		}return null;
	}
	public void obrisi(String id) {
		if(karte.containsKey(id)) { //obrisi, obirisi, a ne odustani
			karte.get(id).setIzbrisana(true);
		}
	}

	public  void generateJSON(String contextpath) throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File(contextpath + "/data/karte.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Karte");
		jsonGenerator.writeStartArray();
		for(Karta k : karte.values()) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Karta");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("cena", k.getCena()+"");
			jsonGenerator.writeStringField("id", k.getId());
			jsonGenerator.writeStringField("manifestacija", k.getNazivmanifestacije());
			jsonGenerator.writeStringField("izbrisana", k.isIzbrisana()+"");
			jsonGenerator.writeStringField("datum", k.getDatum() +"");
			jsonGenerator.writeStringField("status", k.isStatus()+"");
			jsonGenerator.writeStringField("kupac", k.getKorisnickoIme());
			jsonGenerator.writeStringField("tipKarte", k.getTipKarte());
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();


	}

	public void parseJSON(String contextpath) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File(contextpath + "/data/karte.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Karta".equals(fieldName)) { 
							Karta karta=new Karta();
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								
								String nameField = jsonParser.getCurrentName();
								jsonParser.nextToken(); // move to value

								if ("cena".equals(nameField)) {
									karta.setCena(Double.parseDouble(jsonParser.getText()));

								} else if ("id".equals(nameField)) {
									karta.setId(jsonParser.getText());
								}
								else if ("manifestacija".equals(nameField)) {
									karta.setNazivmanifestacije(jsonParser.getText());
								}
								else if ("datum".equals(nameField)) {
									karta.setDatum(jsonParser.getText());
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
									karta.setKorisnickoIme(jsonParser.getText());
								}								
								else if ("tipKarte".equals(nameField)) {
									karta.setTipKarte(jsonParser.getText());

								}

								
							}this.karte.put(karta.getId(), karta);
						}
					}
				}
			} jsonParser.close();
		}
	}
	public void izmeni(Karta karta) {
		if(this.karte.containsKey(karta.getId())) {
			this.karte.put(karta.getId(), karta);
		}
		
		
	}



	public Karta nadjiJednuKartu(String id) {
		if(this.karte.containsKey(id)) {
			return this.karte.get(id);
		}
		return null;
	}


}
