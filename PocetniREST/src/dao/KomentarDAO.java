package dao;

import java.io.File;
import java.io.IOException;
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
import beans.Komentar;
import beans.Pol;
import beans.Prodavac;

public class KomentarDAO{
	ArrayList<Komentar> komentari; //mislim da nema potrebe da komentari imaju id
	private String contextPath;


	public KomentarDAO(KupacDAO kupacDAO, ManifestacijaDAO manifestacijaDAO) {
		komentari=new ArrayList<>();
		try {
			parseJSON(kupacDAO, manifestacijaDAO);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public Collection<Komentar> findAll(){
		return komentari;
	}
	public Komentar addKomentar(Komentar kom) {
		komentari.add(kom);
		return kom;
	}

	public  void generateJSON() throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File("komentari.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Komentari");
		jsonGenerator.writeStartArray();

		for(Komentar k : komentari) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Komentar ");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("text", k.getText()+"");
			jsonGenerator.writeStringField("kupac", k.getKupac().getKorisnickoIme());
			jsonGenerator.writeStringField("manifestacija", k.getManifestacija().getNaziv());
			jsonGenerator.writeStringField("ocena", k.getOcena()+"");
			jsonGenerator.writeEndObject(); // for field 'Administrator'
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();


	}

	public void parseJSON(KupacDAO kupacDAO, ManifestacijaDAO manifestacijaDAO) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File("komentari.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Komentar".equals(fieldName)) { 
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								Komentar kom=new Komentar();
								String nameField = jsonParser.getCurrentName();
								jsonParser.nextToken(); // move to value

								if ("text".equals(nameField)) {
									kom.setText(jsonParser.getText());

								} else if ("ocena".equals(nameField)) {
									kom.setOcena(Integer.parseInt(jsonParser.getText()));
								}else if ("kupac".equals(nameField)) {
									kom.setKupac(kupacDAO.find(jsonParser.getText()));
								}else if ("manifestacija".equals(nameField)) {
									kom.setManifestacija(manifestacijaDAO.find(jsonParser.getText()));
								}
								this.komentari.add(kom);
							}
						} 
					}
				}
			}
		}

					jsonParser.close();



				}

			}
