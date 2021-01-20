package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonParseException;

import beans.Karta;
import beans.Prodavac;

public class KartaDAO implements Ucitavanje{
	HashMap<String, Karta> karte;
	private String contextPath;
	
    public KartaDAO() {
		
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
	@Override
	public void generateJSON() throws IOException {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void parseJSON() throws JsonParseException, IOException {
		// TODO Auto-generated method stub
		
	}
}
