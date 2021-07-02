package dao;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import beans.Kupac;
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
	
	public void updateOne(Manifestacija m) {
		this.manifestacije.put(m.getNaziv(), m);
	}

	public void generateJSON(String contextpath) throws IOException {

		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator jsonGenerator = jsonFactory.createGenerator(new File(contextpath + "/data/manifestacije.json"), JsonEncoding.UTF8);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeFieldName("Manifestacije");
		jsonGenerator.writeStartArray();
		for(Manifestacija k : manifestacije.values()) {
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("Manifestacija");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("naziv", k.getNaziv()+"");
			jsonGenerator.writeStringField("prodavac", k.getProdavac()+"");
			jsonGenerator.writeStringField("brojMesta", k.getBrojMesta()+"");
			jsonGenerator.writeStringField("cena", k.getCenaKarte()+"");
			jsonGenerator.writeStringField("tip", k.getTipManifestacije()+"");
			jsonGenerator.writeStringField("status", k.isStatus()+"");
			jsonGenerator.writeStringField("izbrisana", k.isIzbrisana()+"");
			jsonGenerator.writeStringField("ulica", k.getLokacija().getUlica()+"");
			jsonGenerator.writeStringField("lokacijaBroj", k.getLokacija().getBroj());
			jsonGenerator.writeStringField("drzava", k.getLokacija().getDrzava());
			jsonGenerator.writeStringField("mesto", k.getLokacija().getMesto());
			jsonGenerator.writeStringField("postanskiBroj", k.getLokacija().getPostanskiBroj());
			jsonGenerator.writeStringField("gDuzina", k.getLokacija().getGeografskaDuzina()+"");
			jsonGenerator.writeStringField("gSirina", k.getLokacija().getGeografskaSirina()+"");
			jsonGenerator.writeStringField("datumPocetka", k.getDatumPocetka()+"");
			jsonGenerator.writeStringField("datumKraja", k.getDatumKraja()+"");
			jsonGenerator.writeStringField("vremePocetka", k.getVremePocetka()+"");
			jsonGenerator.writeStringField("vremeKraja", k.getVremeKraja()+"");
			jsonGenerator.writeStringField("poster", k.getPoster()+"");
			jsonGenerator.writeStringField("preostaloRegular", k.getPreostaloRegular()+"");
			jsonGenerator.writeStringField("preostaloVip", k.getPreostaloVip()+"");
			jsonGenerator.writeStringField("preostaloFanpit", k.getPreostaloFanpit()+"");
			


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
								else if("prodavac".equals(nameField)) {
									man.setProdavac(jsonParser.getText());
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
	
	public Collection<Manifestacija> findForSearch(String text) {
		Collection<Manifestacija> ret = new ArrayList<Manifestacija>();
		for (String title : manifestacije.keySet()) {
			if(title.toLowerCase().contains(text.toLowerCase())) {
				ret.add(manifestacije.get(title));
			}
		}
		
		return ret;
	}

	public Collection<Manifestacija> findAll() {
		return manifestacije.values();
	}
	public Collection<Manifestacija> findByUsername(String username){
		Collection<Manifestacija> sve=findAll();
		Collection<Manifestacija> trazene= new ArrayList<Manifestacija>();
		for(Manifestacija m : sve) {
			if(m.getProdavac().equals(username)) {
				trazene.add(m);
			}
		}return trazene;
	}
	
	public Manifestacija addEvent(Manifestacija m) {
		if(!this.manifestacije.containsKey(m.getNaziv())) {
			for(Manifestacija manifestacija : this.manifestacije.values()) {
				if(manifestacija.getLokacija().getGeografskaDuzina()==m.getLokacija().getGeografskaDuzina() 
						&& manifestacija.getLokacija().getGeografskaSirina()==m.getLokacija().getGeografskaSirina()) {
					//ako su na istom mestu
					DateTimeFormatter df=DateTimeFormatter.ofPattern("yyyy-MM-dd"); //datumVreme=2021-06-29
					//ovde cemo da probamo da setujemo  vreme
					System.out.println(manifestacija.getDatumPocetka());
					System.out.println(m.getDatumKraja());
					LocalDateTime postojecaPoocetak=(LocalDateTime) df.parse(manifestacija.getDatumPocetka());
					LocalDateTime postojecaKraj=(LocalDateTime) df.parse(manifestacija.getDatumKraja());
					LocalDateTime novaPoocetak=(LocalDateTime) df.parse(m.getDatumPocetka());
					LocalDateTime novaKraj=(LocalDateTime) df.parse(m.getDatumKraja());
					
					String[] vremePP=manifestacija.getVremePocetka().split(":");
					postojecaPoocetak.withHour(Integer.parseInt(vremePP[0]));
					postojecaPoocetak.withMinute(Integer.parseInt(vremePP[1]));
					
					String[] vremeKP=manifestacija.getVremeKraja().split(":");
					postojecaKraj.withHour(Integer.parseInt(vremeKP[0]));
					postojecaKraj.withMinute(Integer.parseInt(vremeKP[1]));
					
					String[] vremePN=m.getVremePocetka().split(":");
					novaPoocetak.withHour(Integer.parseInt(vremePN[0]));
					novaPoocetak.withMinute(Integer.parseInt(vremePN[1]));
					
					String[] vremeKN=m.getVremeKraja().split(":");
					novaKraj.withHour(Integer.parseInt(vremeKN[0]));
					novaKraj.withMinute(Integer.parseInt(vremeKN[1]));
					
					if((postojecaPoocetak.isBefore(novaPoocetak) && postojecaKraj.isBefore(novaKraj)) ||
							(postojecaPoocetak.isAfter(novaPoocetak) && postojecaKraj.isAfter(novaKraj))) {
						//ovde je onda ok, ali mi treba else
					}else {
						
						return null;
					}
					
				}

			}
			this.manifestacije.put(m.getNaziv(), m);
			return m;
		}return null;
		
	}
	
	public ManifestacijaDAO() {
		this.manifestacije=new HashMap<>();
	}

	public Manifestacija odobri(String naziv) {
		if(this.manifestacije.containsKey(naziv)) {
			this.manifestacije.get(naziv).setStatus(true); //odobren
			return this.manifestacije.get(naziv);
		}
		return null;
	}
		


	public Manifestacija sacuvaj(Manifestacija manifestacija) {
			if(this.manifestacije.containsKey(manifestacija.getNaziv())) {
			this.manifestacije.put(manifestacija.getNaziv(), manifestacija);
			return manifestacija;
			}
			return null;
			
		
	}

	public Manifestacija nadjiJedan(String ime) {
		if(this.manifestacije.containsKey(ime)) {
			return this.manifestacije.get(ime);
		}
		return null;
	}

	public void obrisi(String ime) {
		if(this.manifestacije.containsKey(ime)) {
			this.manifestacije.remove(ime);
		}
		
	}
	

	public void izmeni(String ime, Manifestacija man) {
		if(this.manifestacije.containsKey(ime)) {
			this.manifestacije.remove(ime);
			this.manifestacije.put(man.getNaziv(), man);
			
		}
		
	}
	public void izbrisi(String ime) {
		if(this.manifestacije.containsKey(ime)) {
			this.manifestacije.get(ime).setIzbrisana(true);
			
			
		}
	}

	public HashMap<String, Manifestacija> getManifestacije() {
		return manifestacije;
	}

	public void setManifestacije(HashMap<String, Manifestacija> manifestacije) {
		this.manifestacije = manifestacije;
	}

	public void izmeni(String string, String dan, String fan, String kraj, String ukupno, String tip,
			String cena, String vip) {
		if(this.manifestacije.containsKey(string)) {
			Manifestacija m=this.manifestacije.get(string);
			m.setDatumPocetka(dan);
			m.setBrojMesta(Integer.parseInt(ukupno));
			m.setCenaKarte(Double.parseDouble(cena));
			m.setPreostaloFanpit(Integer.parseInt(fan));
			m.setPreostaloVip(Integer.parseInt(vip));
			m.setDatumKraja(kraj);
			m.setTipManifestacije(tip);
			
			
		}
		
	}

	public boolean izmeni(Manifestacija m, HashMap<String, String> name1) {
		//road=, city=, nu=, postcode=, tip=nestooo, gduzina=-10000, gsirina=-10000 i jos slika
		if(!name1.get("gduzina").equals("-10000") && !name1.get("gsirina").equals("-10000")) {
			boolean proveren=proveriLokaciju(name1.get("gduzina"),name1.get("gsirina"),m);
			if(proveren) {
				m.getLokacija().setGeografskaDuzina(Double.parseDouble(name1.get("gduzina")));
				m.getLokacija().setGeografskaSirina(Double.parseDouble(name1.get("gsirina")));
				m.getLokacija().setBroj(name1.get("nu"));
				m.getLokacija().setUlica(name1.get("road"));
				m.getLokacija().setMesto(name1.get("city"));
				m.getLokacija().setPostanskiBroj(name1.get("postcode"));
			}else {return false;}
		}if(!name1.get("slika").equals("")) {
			
			m.setPoster(name1.get("slika").split("base64,")[1]);
			m.setPoster(m.getPoster().substring(0, m.getPoster().length()-2));
		}
		m.setTipManifestacije(name1.get("tip"));
		System.out.println(m.getTipManifestacije()+" ovdeeee");
		return true;
		
	}

	private boolean proveriLokaciju(String duzina, String sirina, Manifestacija m) {
		for(Manifestacija manifestacija : this.manifestacije.values()) {
			if(manifestacija.getLokacija().getGeografskaDuzina()==Double.parseDouble(duzina) && !m.getNaziv().equals(manifestacija.getNaziv())
					&& manifestacija.getLokacija().getGeografskaSirina()==Double.parseDouble(sirina)) {
				//ako su na istom mestu
				DateTimeFormatter df=DateTimeFormatter.ofPattern("yyyy-MM-dd"); //datumVreme=2021-06-29
				//ovde cemo da probamo da setujemo  vreme
				System.out.println(manifestacija.getDatumPocetka());
				System.out.println(m.getDatumKraja());
				LocalDateTime postojecaPoocetak=(LocalDateTime) df.parse(manifestacija.getDatumPocetka());
				LocalDateTime postojecaKraj=(LocalDateTime) df.parse(manifestacija.getDatumKraja());
				LocalDateTime novaPoocetak=(LocalDateTime) df.parse(m.getDatumPocetka());
				LocalDateTime novaKraj=(LocalDateTime) df.parse(m.getDatumKraja());
				
				String[] vremePP=manifestacija.getVremePocetka().split(":");
				postojecaPoocetak.withHour(Integer.parseInt(vremePP[0]));
				postojecaPoocetak.withMinute(Integer.parseInt(vremePP[1]));
				
				String[] vremeKP=manifestacija.getVremeKraja().split(":");
				postojecaKraj.withHour(Integer.parseInt(vremeKP[0]));
				postojecaKraj.withMinute(Integer.parseInt(vremeKP[1]));
				
				String[] vremePN=m.getVremePocetka().split(":");
				novaPoocetak.withHour(Integer.parseInt(vremePN[0]));
				novaPoocetak.withMinute(Integer.parseInt(vremePN[1]));
				
				String[] vremeKN=m.getVremeKraja().split(":");
				novaKraj.withHour(Integer.parseInt(vremeKN[0]));
				novaKraj.withMinute(Integer.parseInt(vremeKN[1]));
				
				if((postojecaPoocetak.isBefore(novaPoocetak) && postojecaKraj.isBefore(novaKraj)) ||
						(postojecaPoocetak.isAfter(novaPoocetak) && postojecaKraj.isAfter(novaKraj))) {
					//ovde je onda ok, ali mi treba else
				}else {
					
					return false;
				}
			}
		}
		
		return true;
	}

}
