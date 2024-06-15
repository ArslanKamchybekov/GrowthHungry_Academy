import java.util.Hashtable;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        Hashtable<String, String> table = new Hashtable<>(21);
        table.put("100", "Spongebob");
        table.put("123", "Patrick");
        table.put("321", "Sandy");
        table.put("555", "Squidward");
        table.put("777", "Gary");
        //table.remove(777) ;
        for (String key : table.keySet()) {
            System.out.println(key.hashCode() % 10  +  "\t" +key + "\t" + table.get(key)) ;

        }
    }
}