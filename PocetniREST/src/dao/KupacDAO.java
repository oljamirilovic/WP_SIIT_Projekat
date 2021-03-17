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

import beans.Karta;
import beans.Kupac;

import beans.Prodavac;

public class KupacDAO  {
	HashMap<String, Kupac> kupci;
	private  String contextPath;


	public KupacDAO(String contextpath) {
		super();
		kupci=new HashMap<>();
		try {
			parseJSON(contextpath);
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
	
	public void generateJSON(String contextpath) throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File(contextpath + "/data/kupci.json"), JsonEncoding.UTF8);
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
			String dan=k.getDatumRodjenja();
			jsonGenerator.writeStringField("datum", dan);
			jsonGenerator.writeStringField("pol", k.getPol());
			jsonGenerator.writeStringField("bododvi", k.getSakupljeniBodovi()+"");
			jsonGenerator.writeStringField("izbrisan", k.isIzbrisan()+"");
			jsonGenerator.writeStringField("blokiran", k.isBlokiran()+"");
			jsonGenerator.writeStringField("tipKupca", k.getTip().getTipKupca());
			jsonGenerator.writeStringField("bodoviTipa", k.getTip().getBodovi()+"");
			jsonGenerator.writeStringField("popust", k.getTip().getPopust()+"");
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();
		}

	public void parseJSON(String contextpath) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File(contextpath + "/data/kupci.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Kupac".equals(fieldName)) { 
							Kupac kupac=new Kupac();
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								//Kupac kupac=new Kupac();
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
									kupac.setPol(jsonParser.getText());
								}
								else if ("bodovi".equals(nameField)) {
									kupac.setSakupljeniBodovi(Integer.parseInt(jsonParser.getText()));
								}else if ("bodoviTipa".equals(nameField)) {
									if(kupac.getTip()==null) {kupac.setTip(new beans.TipKupca());}
									kupac.getTip().setBodovi(Integer.parseInt(jsonParser.getText()));
								}
								else if ("popust".equals(nameField)) {
									if(kupac.getTip()==null) {kupac.setTip(new beans.TipKupca());}
									kupac.getTip().setPopust(Double.parseDouble(jsonParser.getText()));
								}
								else if ("tipKupca".equals(nameField)) {
									if(kupac.getTip()==null) {kupac.setTip(new beans.TipKupca());}
									kupac.getTip().setIme(jsonParser.getText());
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
									//DateTimeFormatter fo=DateTimeFormatter.ofPattern("dd.MM.yyyy.");
									//LocalDate dan=LocalDate.parse(jsonParser.getText(), fo);
									kupac.setDatumRodjenja(jsonParser.getText());
								}
								//this.kupci.put(kupac.getKorisnickoIme(), kupac);

							}
							this.kupci.put(kupac.getKorisnickoIme(), kupac);
						} 
					}

				}
			}
		}
		jsonParser.close();

	}
	public void obrisiKupca(String id) {
		if(this.kupci.containsKey(id)) {
			this.kupci.get(id).setIzbrisan(true);
		}
	}
	public void blokirajKupca(String id) {
		if(this.kupci.containsKey(id)) {
			this.kupci.get(id).setBlokiran(true);
		}
	}
	public ArrayList<Kupac> sumnjivi(){
		ArrayList<Kupac> kupciS=new ArrayList<>();
		for(Kupac k : this.kupci.values()) {
			if(k.getKarte().size()>=5) {
				int i=0;
				for(Karta karta: k.getKarte()) {
					if(karta.isStatus()==false) {
						i++;
					}
					if(i>4) {
						kupciS.add(k);
						break;
					}
				}
			}
		}
		return kupciS;
	}

}
