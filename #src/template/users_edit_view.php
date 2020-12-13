<h1>Редактирование данных пользователя</h1>
<form action="/users" method="post">
        <input type="hidden" name="user_id" value="<?php echo $data[0]['user_id']; ?>">
        <p><label for="first_name">Имя<br>
        <input class="input" id="first_name" name="first_name"size="32"  type="text" value="<?php echo $data[0]['first_name']; ?>"></label></p>
        <p><label for="last_name">Фамилия<br>
        <input class="input" id="last_name" name="last_name"size="32"  type="text" value="<?php echo $data[0]['last_name']; ?>"></label></p>
        <p><label for="phone">Телефон<br>
        <input class="input" id="phone" name="phone"size="32"  type="text" value="<?php echo $data[0]['phone']; ?>"></label></p>
        <p><label for="mail">Email<br>
        <input class="input" id="mail" name="mail"size="32"  type="text" value="<?php echo $data[0]['mail']; ?>"></label></p>

        <p><label for="role">Роль<br>
        <select name="role" required>
        <?php
        foreach($data[1] as $row){
            $is_checked = '';
            if ($row['role_id']==$data[0]['role_id']) $is_checked = 'selected ';
            echo '<option '.$is_checked.'value="'.$row['role_id'].'">'.$row['name'].'</option>';
        }
        ?>
        </select>
        </label></p>

        <p><label for="org">Организация<br>
        <select name="org" required>
        <?php
        foreach($data[2] as $row){
            $is_checked = '';
            if ($row['organization_id']==$data[0]['organization_id']) $is_checked = 'selected ';
            echo '<option '.$is_checked.'value="'.$row['organization_id'].'">'.$row['name'].'</option>';
        }
        ?>
        </select>
        </label></p>
        <p class="submit"><input class="button" id="user_edit" name="user_edit" type="submit" value="Сохранить"></p>
    </form>
