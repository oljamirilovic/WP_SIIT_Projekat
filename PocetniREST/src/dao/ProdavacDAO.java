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
import beans.Pol;
import beans.Prodavac;

public class ProdavacDAO implements Ucitavanje{
	private HashMap<String, Prodavac> prodavci;
	private String ContextPath;
	
	public ProdavacDAO() {
		
	}
	
	
	public Prodavac log(String korisnickoIme, String sifra) {
		//username je jedinstven
		if(prodavci.containsKey(korisnickoIme)) {
			if(prodavci.get(korisnickoIme).getLozinka().equals(sifra)) {
			return prodavci.get(korisnickoIme);}
		}
		return null;
	}
	public Collection<Prodavac> findAll(){
		return prodavci.values();
	}
	public Prodavac addUser(Prodavac user) {
		if(find(user.getKorisnickoIme()) != null) {
			return null;
		}
		prodavci.put(user.getKorisnickoIme(), user);
		return user;
	}
	public Prodavac find(String korisnickoIme) {
		if(prodavci.containsKey(korisnickoIme)) {
			return prodavci.get(korisnickoIme);
		}return null;
	}
	public  void generateJSON() throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File("prodavci.json"), JsonEncoding.UTF8);

		for(Prodavac prod : prodavci.values()) {
		jsonGenerator.writeStartObject();
		jsonGenerator.writeObjectFieldStart("Prodavci");
		jsonGenerator.writeStringField("korisnickoIme", prod.getKorisnickoIme());
		jsonGenerator.writeStringField("lozinka", prod.getLozinka());
		jsonGenerator.writeStringField("ime", prod.getIme());
		jsonGenerator.writeStringField("prezime", prod.getPrezime());
		DateTimeFormatter formater=DateTimeFormatter.ofPattern("dd.mm.yyyy.");
		String dan=prod.getDatumRodjenja().format(formater);
		jsonGenerator.writeStringField("rodjenje", dan);
		jsonGenerator.writeStringField("pol", prod.getPol().name());
		//jsonGenerator.writeStringField("pol", prod.ge);
		//ovde dode lista??
		jsonGenerator.writeEndObject(); // for field 'Administrator'
		
		}
		jsonGenerator.writeStringField("Title", "Administratori");
		jsonGenerator.writeEndObject();
        jsonGenerator.close();

	}
	
	public  void parseJSON() throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File("prodavci.json"));

		jsonParser.nextToken();

	        while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
			String fieldName = jsonParser.getCurrentName();
			jsonParser.nextToken(); 
			if ("Prodavci".equals(fieldName)) { //TODO: proveri ovo, exceptions, and i sta tacno ucitava?
				while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
					Prodavac admin=new Prodavac();
					String nameField = jsonParser.getCurrentName();
					jsonParser.nextToken(); // move to value

					if ("korisnickoIme".equals(nameField)) {
						admin.setKorisnickoIme(jsonParser.getText());

					} else if ("lozinka".equals(nameField)) {
						admin.setLozinka(jsonParser.getText());
					}else if ("ime".equals(nameField)) {
						admin.setIme(jsonParser.getText());
					}else if ("prezime".equals(nameField)) {
						admin.setPrezime(jsonParser.getText());
					}else if ("pol".equals(nameField)) {
						if(jsonParser.getText().equals("MUSKI")) {
						admin.setPol(Pol.MUSKI);}
						else {
							admin.setPol(Pol.ZENSKI);
							
						}
					}else {
						DateTimeFormatter formater=DateTimeFormatter.ofPattern("dd.mm.yyyy.");
						LocalDateTime dan=LocalDateTime.parse(jsonParser.getText(), formater);
						admin.setDatumRodjenja(dan);
					}
					this.prodavci.put(admin.getKorisnickoIme(), admin);
				
				}
			} 
		}

		jsonParser.close();

	}
}
