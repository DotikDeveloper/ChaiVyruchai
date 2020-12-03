<h1>Пользователи</h1>
<p>
<table border="1">
<tr><td>Имя</td><td>Фамилия</td><td>Телефон</td><td>Email</td><td>Роль</td><td>Организация</td><td>Последние изменения</td><td></td><td></td></tr>
<?php
	foreach($data[0] as $row)
	{
    echo '<tr><td>'.$row['first_name'].'</td><td>'.$row['last_name'].'</td><td>'.$row['phone'].'</td><td>'.$row['mail'].'</td><td>'.$row['role'].'</td><td>'.$row['organization'].'</td><td>'.$row['date'].'</td><td>'.
    '<form action="/users" method="POST">
    <input type="hidden" name="del_id" value="'.$row['user_id'].'">
    <input type="submit" value="Удалить">
    </form>'
    .'</td>
    <td>'.
    '<form action="/users/edit" method="POST">
    <input type="hidden" name="user_id" value="'.$row['user_id'].'">
    <input type="submit" value="Редактировать">
    </form>'
    .'</td></tr>';
    }

?>
</table>
</p>

<h1>Добавление нового пользователя</h1>
<form action="/users" method="post">
        <p><label for="first_name">Имя<br>
        <input class="input" id="first_name" name="first_name"size="32"  type="text" value=""></label></p>
        <p><label for="last_name">Фамилия<br>
        <input class="input" id="last_name" name="last_name"size="32"  type="text" value=""></label></p>
        <p><label for="phone">Телефон<br>
        <input class="input" id="phone" name="phone"size="32"  type="text" value=""></label></p>
        <p><label for="phone">Пароль<br>
        <input class="input" name="password" size="32"  type="password" value=""></label></p>
        <p><label for="mail">Email<br>
        <input class="input" id="mail" name="mail"size="32"  type="text" value=""></label></p>
        <p><label for="role">Роль<br>
        <select name="role" required>
        <option></option>
        <?php
        foreach($data[1] as $row){
            echo '<option value="'.$row['role_id'].'">'.$row['name'].'</option>';
        }
        ?>
        </select>
        </label></p>
        <p><label for="org">Организация<br>
        <select name="org">
        <option></option>
        <?php
        foreach($data[2] as $row){
            echo '<option value="'.$row['organization_id'].'">'.$row['name'].'</option>';
        }
        ?>
        </select>
        </label></p>
        <p class="submit"><input class="button" id="user_add" name="user_add" type="submit" value="Добавить"></p>
    </form>
