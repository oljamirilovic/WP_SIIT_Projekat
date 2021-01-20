package dao;

import java.io.IOException;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonParseException;

import beans.Karta;
import beans.Manifestacija;

public class ManifestacijaDAO implements Ucitavanje {
	HashMap<String, Manifestacija> manifestacija;
	private String contextPath;
	@Override
	public void generateJSON() throws IOException {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void parseJSON() throws JsonParseException, IOException {
		// TODO Auto-generated method stub
		
	}

}
