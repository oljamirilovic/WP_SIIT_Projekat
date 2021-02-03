package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
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


public class AdministratorDao {
	private HashMap<String, Administrator> administratori;
	private String ContextPath;


	//kreiranje prodavaca 
	//pregled svih korisnika
	//odobravanje manifestacija-- iz pregleda manifestacija moze da klikne na dugme za odobravanje
	//blokiranje ljudi i svega
	//brisanje
	//pregled svih karata
	//pregled svih komentara


	public Administrator log(String korisnickoIme, String sifra) {
		//username je jedinstven
		if(administratori.containsKey(korisnickoIme)) {
			if(administratori.get(korisnickoIme).getLozinka().equals(sifra)) {
				return administratori.get(korisnickoIme);}
		}
		return null;
	}
	public AdministratorDao(String contextpath) {
		super();
		administratori=new HashMap<>();
		try {
			parseJSON(contextpath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


	public Collection<Administrator> findAll(){
		return administratori.values();
	}
	public Administrator addUser(Administrator user) {
		if(find(user.getKorisnickoIme()) != null) {
			return null;
		}
		administratori.put(user.getKorisnickoIme(), user);
		return user;
	}
	public Administrator find(String korisnickoIme) {
		if(administratori.containsKey(korisnickoIme)) {
			return administratori.get(korisnickoIme);
		}return null;
	}
	public  void generateJSON(String contextpath) throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File(contextpath + "/data/administratori.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Administratori");
		jsonGenerator.writeStartArray();

		for(Administrator admin : administratori.values()) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Admin");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("korisnickoIme", admin.getKorisnickoIme());
			jsonGenerator.writeStringField("lozinka", admin.getLozinka());
			jsonGenerator.writeStringField("ime", admin.getIme());
			jsonGenerator.writeStringField("prezime", admin.getPrezime());
			String dan=admin.getDatumRodjenja();
			jsonGenerator.writeStringField("rodjenje", dan);
			jsonGenerator.writeStringField("pol", "male");

			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();

	}

	public void parseJSON(String contextpath) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File(contextpath + "/data/administratori.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Admin".equals(fieldName)) { 
							Administrator admin=new Administrator();
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								//Administrator admin=new Administrator();
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
									admin.setPol(jsonParser.getText());}
									
								else {
									//DateTimeFormatter formater=DateTimeFormatter.ofPattern("dd.MM.yyyy.");
									//LocalDate dan=LocalDate.parse(jsonParser.getText(), formater);
									admin.setDatumRodjenja(jsonParser.getText());
								}
								//this.administratori.put(admin.getKorisnickoIme(), admin);
							}
							this.administratori.put(admin.getKorisnickoIme(), admin);
						} 
					}
				}
			}
		}

		jsonParser.close();

	}


}
