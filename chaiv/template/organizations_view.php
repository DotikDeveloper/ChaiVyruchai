<h1>Организации</h1>
<p>
<table border="1">
<tr><td>Название</td><td>Адрес</td><td>Email</td><td>Телефон</td><td>Создано</td><td></td><td></td></tr>
<?php

	foreach($data as $row)
	{
    echo '<tr><td>'.$row['name'].'</td><td>'.$row['address'].'</td><td>'.$row['mail'].'</td><td>'.$row['phone'].'</td><td>'.$row['date'].'</td><td>'.
    '<form action="/organizations" method="POST">
    <input type="hidden" name="del_id" value="'.$row['organization_id'].'">
    <input type="submit" value="Удалить">
    </form>'
    .'</td>
    <td>'.
    '<form action="/organizations/edit" method="POST">
    <input type="hidden" name="organization_id" value="'.$row['organization_id'].'">
    <input type="submit" value="Редактировать">
    </form>'
    .'</td></tr>';
    }

?>
</table>
</p>

<h1>Добавление новой организации</h1>
<form action="/organizations" method="post"name="org_create">
        <p><label for="org_name">Название организации<br>
        <input class="input" id="org_name" name="org_name"size="32"  type="text" value=""></label></p>
        <p><label for="org_address">Адрес организации<br>
        <input class="input" id="org_address" name="org_address"size="32"  type="text" value=""></label></p>
        <p><label for="org_mail">Email организации<br>
        <input class="input" id="org_mail" name="org_mail"size="32"  type="text" value=""></label></p>
        <p><label for="org_phone">Телефон организации<br>
        <input class="input" id="org_phone" name="org_phone"size="32"  type="text" value=""></label></p>

        <p class="submit"><input class="button" id="org_add" name="org_add" type="submit" value="Добавить"></p>
    </form>
