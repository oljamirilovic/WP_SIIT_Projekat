package beans;

public class TipKupca {

	private String tipKupca;
	private double popust;
	private int bodovi;
	
	
	
	public void setTipKupca(String tipKupca) {
		this.tipKupca = tipKupca;
	}
	public String getTipKupca() {
		return tipKupca;
	}
	public void setIme(String ime) {
		this.tipKupca = ime;
	}
	public double getPopust() {
		return popust;
	}
	public void setPopust(double popust) {
		this.popust = popust;
	}
	public int getBodovi() {
		return bodovi;
	}
	public void setBodovi(int bodovi) {
		this.bodovi = bodovi;
	}
	public TipKupca() {
		super();
	}
	
	public TipKupca(String tip) {
		this.tipKupca = tip;
		this.bodovi = 3000;
		this.popust = 1;
	}
	
}
