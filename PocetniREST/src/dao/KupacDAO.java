package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonParseException;

import beans.Karta;
import beans.Kupac;
import beans.Prodavac;

public class KupacDAO implements Ucitavanje {
	HashMap<String, Kupac> kupci;
	private  String contextPath;
	
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
		// TODO Auto-generated method stub
		
	}
	@Override
	public void parseJSON() throws JsonParseException, IOException {
		// TODO Auto-generated method stub
		
	}

}
