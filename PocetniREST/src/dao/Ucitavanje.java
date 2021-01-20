package dao;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;

public interface Ucitavanje {
	public  void generateJSON() throws IOException;
	public  void parseJSON() throws JsonParseException, IOException;

}
