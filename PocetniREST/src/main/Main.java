package main;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;

import beans.Administrator;

import dao.AdministratorDao;

public class Main {

	public static void main(String[] args) {
		
		Administrator admin=new Administrator();
		admin.setDatumRodjenja(LocalDate.now());
		admin.setIme("Olivera");
		admin.setPrezime("Mirilovic");
		admin.setKorisnickoIme("olivera");
		admin.setLozinka("olja123");
		admin.setPol("zenski");
		Administrator ad2=new Administrator();
		ad2.setDatumRodjenja(LocalDate.now());
		ad2.setIme("Natasa");
		ad2.setPrezime("Rajtarov");
		ad2.setKorisnickoIme("natasa");
		ad2.setLozinka("natasa123");
		ad2.setPol("zenski");
		AdministratorDao dao=new AdministratorDao();
		try {
			dao.generateJSON();
		} catch (IOException e) {
			
			e.printStackTrace();
		}	
	}

}
