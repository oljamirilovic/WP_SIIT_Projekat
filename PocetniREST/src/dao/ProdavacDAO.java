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
import beans.Manifestacija;
import beans.Prodavac;
import beans.TipKupca;

public class ProdavacDAO {
	private  HashMap<String, Prodavac> prodavci;
	private String ContextPath;


	public ProdavacDAO(String contextpath) {
		this.prodavci=new HashMap<>();
		try {
			parseJSON(contextpath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


	public Prodavac log(String korisnickoIme, String sifra) {
		//username je jedinstven
		if(prodavci.containsKey(korisnickoIme)) {
			if(prodavci.get(korisnickoIme).getLozinka().equals(sifra)) {
				return prodavci.get(korisnickoIme);}
		}
		return null;
	}
	
	public void updateOne(Prodavac k) {
		this.prodavci.put(k.getKorisnickoIme(), k);
	}
	
	public Collection<Prodavac> findAll(){
		return prodavci.values();
	}
	public Prodavac addUser(Prodavac user) {
		//{date=1999-01-01, lastName=zumra, password=, gender=male, name=zumra, username=zumra}
		if(find(user.getKorisnickoIme()) != null) {
			return null;
		}
		prodavci.put(user.getKorisnickoIme(), user);
		return user;
	}
	public Prodavac addProdavac( HashMap<String,String> user) {
		//{date=1999-01-01, lastName=zumra, password=, gender=male, name=zumra, username=zumra}
		
		if(find(user.get("username")) != null) {
			return null;
		}
		Prodavac p=new Prodavac();
		p.setDatumRodjenja(user.get("date"));
		p.setPrezime(user.get("lastName"));
		p.setLozinka(user.get("password"));
		if(user.get("gender").equals("male")) {
		p.setPol("musko");}else {
			p.setPol("zensko");
		}
		p.setIme(user.get("name"));
		p.setKorisnickoIme("username");
		prodavci.put(p.getKorisnickoIme(), p);
		//generateJSON(ContextPath);
		return p;
	}
	public Prodavac find(String korisnickoIme) {
		if(prodavci.containsKey(korisnickoIme)) {
			return prodavci.get(korisnickoIme);
		}return null;
	}
	public  void generateJSON(String contextpath) throws IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File(contextpath + "/data/prodavci.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Prodavci");
		jsonGenerator.writeStartArray();

		for(Prodavac prod : prodavci.values()) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Prodavac");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("korisnickoIme", prod.getKorisnickoIme());
			jsonGenerator.writeStringField("lozinka", prod.getLozinka());
			jsonGenerator.writeStringField("ime", prod.getIme());
			jsonGenerator.writeStringField("prezime", prod.getPrezime());
			String dan=prod.getDatumRodjenja();
			jsonGenerator.writeStringField("rodjenje", dan);
			jsonGenerator.writeStringField("pol", prod.getPol());
			jsonGenerator.writeStringField("izbrisan", prod.isIzbrisan()+"");
			jsonGenerator.writeStringField("blokiran", prod.isBlokiran()+"");
			jsonGenerator.writeEndObject(); 
			jsonGenerator.writeEndObject();
		}

		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.close();

	}

	public  void parseJSON(String contextpath) throws JsonParseException, IOException {
		JsonFactory jsonFactory = new JsonFactory();
		JsonParser jsonParser = jsonFactory.createParser(new File(contextpath + "/data/prodavci.json"));

		if(jsonParser.nextToken()==JsonToken.START_OBJECT) {
			JsonToken fieldName2 = jsonParser.nextToken();


			if(jsonParser.nextToken().equals(JsonToken.START_ARRAY)) {

				while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
					while(jsonParser.nextToken()!=JsonToken.END_OBJECT) {
						String fieldName = jsonParser.getCurrentName();
						jsonParser.nextToken();  
						if ("Prodavac".equals(fieldName)) { 
							Prodavac admin=new Prodavac();
							while (jsonParser.nextToken() != JsonToken.END_OBJECT) {
								//Prodavac admin=new Prodavac();
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
								}
								else if("blokiran".equals(nameField)){
									if("true".equals(jsonParser.getText())) {
										admin.setBlokiran(true);
									}else {
										admin.setBlokiran(false);
									}
								}
								else if("izbrisan".equals(nameField)){
									if("true".equals(jsonParser.getText())) {
										admin.setIzbrisan(true);
									}else {
										admin.setIzbrisan(false);
									}
								}
								else if ("pol".equals(nameField)) {
									
										admin.setPol(jsonParser.getText());
								}else {
									admin.setDatumRodjenja(jsonParser.getText());
								}
								//this.prodavci.put(admin.getKorisnickoIme(), admin);

							}
							this.prodavci.put(admin.getKorisnickoIme(), admin);
						} 
					}
				}}}
		jsonParser.close();

	}
	public Collection<String> nadjiKupce(String username, Collection<Karta> karte) {
		Prodavac p=this.prodavci.get(username);
		if(p!=null) {
			System.out.println(p.getManifestacije()+"jj");
		Collection<Manifestacija> m=p.getManifestacije();
		//na sesiji bi trebalo da imamo kolekciju karata
		//Collection<Karta> karte=new ArrayList<Karta>();
		ArrayList<String> kupci=new ArrayList<>();
		for(Manifestacija ma:m) {
			for(Karta k : karte) {
				if(k.getNazivmanifestacije().equals(ma.getNaziv())) {
					kupci.add(k.getKorisnickoIme());
				}
			}
		}
		
		return kupci;	}
		return null;
	
	}
	private Collection<String> nadjiKupce(Prodavac p, Collection<Karta> karte) {
		System.out.println(p.getManifestacije()+"jj");
		Collection<Manifestacija> m=p.getManifestacije();
		//na sesiji bi trebalo da imamo kolekciju karata
		//Collection<Karta> karte=new ArrayList<Karta>();
		
		ArrayList<String> kupci=new ArrayList<>();
		for(Manifestacija ma:m) {
			for(Karta k : karte) {
				if(k.getNazivmanifestacije().equals(ma.getNaziv())) {
					kupci.add(k.getKorisnickoIme());
					
				}
			}
		}
		return kupci;	
	}

	public Collection<Kupac> nadjiCeleKupce(Prodavac p, Collection<Karta>karte, Collection<Kupac> sviKupci){
		Collection<String> pronadjeniKupci=nadjiKupce(p, karte);
		Collection<Kupac> filtrirano=new ArrayList<Kupac>();
		HashMap<String,Kupac> svi=new HashMap<String, Kupac>();
		for(Kupac k: sviKupci) {
			for(String ime : pronadjeniKupci) {
				if(ime.equals(k.getKorisnickoIme())) {
					//filtrirano.add(k);
					svi.put(k.getKorisnickoIme(), k);
					
				}
			}
			
		}
		filtrirano=svi.values();
		System.out.println(filtrirano.size());
		/*
		if(filtrirano.size()==0) { //TODO ovo izb posle
			Kupac k=new Kupac("g","G","g","g","g","g");
			k.setKarte(new ArrayList<Karta>());
			k.setTip(new TipKupca());
			k.getTip().setTipKupca("gl");
			filtrirano.add(k);
		}*/
		return filtrirano;
		
		
		
	}
	

	public Collection<Karta> nadjiKarte(String username,Collection<Karta> karte ) {
		Prodavac p=this.prodavci.get(username);
		if(p!=null) {
		Collection<Manifestacija> m=p.getManifestacije();
		
		Collection<Karta> karte1=new ArrayList<Karta>();
		//TODO iz liste karata pravi novu listu karata
		for(Manifestacija ma:m) {
			for(Karta k : karte) {
				if(k.getNazivmanifestacije().equals(ma.getNaziv()) && k.isStatus()) {
					karte1.add(k);
				}
			}
	}
		return karte1;}
		
		return null;
		
		
	}

	public void blokiraj(Prodavac user) {
		 if(this.prodavci.containsKey(user.getKorisnickoIme())){
			 this.prodavci.get(user).setBlokiran(true);
		 }
		
	}


	public void obrisi(String user) {
		if(this.prodavci.containsKey(user)){
			 this.prodavci.get(user).setIzbrisan(true);
		 }
		
	}


	public Prodavac addUser(HashMap<String, String> user) {
		//System.out.println(user);//{date=1999-01-01, lastName=e, password=, gender=male, name=e, username=e}
		Prodavac prodavac=new Prodavac(user);
		return null;
	}
}
