package dao;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Date;
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
import beans.Manifestacija;


public class ManifestacijaDAO  {
	HashMap<String, Manifestacija> manifestacije;
	private String contextPath;

	public ManifestacijaDAO(String contextpath) {
		this.manifestacije=new HashMap<>();
		try {
			parseJSON(contextpath);
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
			jsonGenerator.writeStringField("tip", k.getTipManifestacije()+"");
			jsonGenerator.writeStringField("status", k.isStatus()+"");
			jsonGenerator.writeStringField("izbrisana", k.isIzbrisana()+"");
			jsonGenerator.writeStringField("lokacijaBroj", k.getLokacija().getBroj());
			jsonGenerator.writeStringField("drzava", k.getLokacija().getDrzava());
			jsonGenerator.writeStringField("mesto", k.getLokacija().getMesto());
			jsonGenerator.writeStringField("postanskiBroj", k.getLokacija().getPostanskiBroj());
			jsonGenerator.writeStringField("gDuzina", k.getLokacija().getGeografskaDuzina()+"");
			jsonGenerator.writeStringField("gSirina", k.getLokacija().getGeografskaSirina()+"");
			jsonGenerator.writeStringField("preostaloRegular", k.getPreostaloRegular()+"");
			jsonGenerator.writeStringField("preostaloVip", k.getPreostaloVip()+"");
			jsonGenerator.writeStringField("preostaloFanpit", k.getPreostaloFanpit()+"");
			jsonGenerator.writeStringField("datumPocetka", k.getDatumPocetka()+"");
			jsonGenerator.writeStringField("datumKraja", k.getDatumKraja()+"");
			jsonGenerator.writeStringField("vremePocetka", k.getVremePocetka()+"");
			jsonGenerator.writeStringField("vremeKraja", k.getVremeKraja()+"");
			

			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();

	}

	public void parseJSON(String contextpath) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File(contextpath + "/data/manifestacije.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Manifestacija".equals(fieldName)) { 
							Manifestacija man=new Manifestacija();
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								//Manifestacija man=new Manifestacija();
								String nameField = jsonParser.getCurrentName();
								jsonParser.nextToken(); // move to value

								if ("naziv".equals(nameField)) {
									man.setNaziv(jsonParser.getText());

								} else if ("tip".equals(nameField)) {
									man.setTipManifestacije(jsonParser.getText());
								}else if ("brojMesta".equals(nameField)) {
									man.setBrojMesta(Integer.parseInt(jsonParser.getText()));
								}else if("poster".equals(nameField)) {
									man.setPoster(jsonParser.getText());
								}
								else if ("datumPocetka".equals(nameField)) {
									man.setDatumPocetka(jsonParser.getText());
								}
								else if ("datumKraja".equals(nameField)) {
									man.setDatumKraja(jsonParser.getText());
								}
								else if ("vremePocetka".equals(nameField)) {
									man.setVremePocetka(jsonParser.getText());
								}
								else if ("vremeKraja".equals(nameField)) {
									man.setVremeKraja(jsonParser.getText());
								}
								else if ("preostaloRegular".equals(nameField)) {
									man.setPreostaloRegular(Integer.parseInt(jsonParser.getText()));
								}
								else if ("preostaloVip".equals(nameField)) {
									man.setPreostaloVip(Integer.parseInt(jsonParser.getText()));
								}
								else if ("preostaloFanpit".equals(nameField)) {
									man.setPreostaloFanpit(Integer.parseInt(jsonParser.getText()));
								}
								else if ("cena".equals(nameField)) {
									man.setCenaKarte(Double.parseDouble(jsonParser.getText()));
								}
								else if("ulica".equals(nameField)) {
									if(man.getLokacija()==null) {man.setLokacija(new Lokacija());}
									man.getLokacija().setUlica(jsonParser.getText());
								}
								else if ("lokacijaBroj".equals(nameField)) {
									if(man.getLokacija()==null) {man.setLokacija(new Lokacija());}
									man.getLokacija().setBroj(jsonParser.getText());
								}
								else if ("drzava".equals(nameField)) {
									if(man.getLokacija()==null) {man.setLokacija(new Lokacija());}
									man.getLokacija().setDrzava(jsonParser.getText());
								}else if ("mesto".equals(nameField)) {
									if(man.getLokacija()==null) {man.setLokacija(new Lokacija());}
									man.getLokacija().setMesto(jsonParser.getText());
								}else if ("postanskiBroj".equals(nameField)) {
									if(man.getLokacija()==null) {man.setLokacija(new Lokacija());}
									man.getLokacija().setPostanskiBroj(jsonParser.getText());
								}else if ("gDuzina".equals(nameField)) {
									if(man.getLokacija()==null) {man.setLokacija(new Lokacija());}
									man.getLokacija().setGeografskaDuzina(Double.parseDouble(jsonParser.getText()));
								}else if ("gSirina".equals(nameField)) {
									if(man.getLokacija()==null) {man.setLokacija(new Lokacija());}
									man.getLokacija().setGeografskaSirina(Double.parseDouble(jsonParser.getText()));
								}
								else if ("status".equals(nameField)) {
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


								//this.manifestacije.put(man.getNaziv(), man);
							}this.manifestacije.put(man.getNaziv(), man);
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
