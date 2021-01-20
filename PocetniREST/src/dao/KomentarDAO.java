package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonParseException;

import beans.Karta;
import beans.Komentar;
import beans.Prodavac;

public class KomentarDAO implements Ucitavanje{
	HashMap<String, Komentar> komentari;
	private String contextPath;

	
	public Collection<Komentar> findAll(){
		return komentari.values();
	}
	public Komentar addKomentar(Komentar kom) {
		return null; //TODO:proveriti da li komentaru dodati id
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
