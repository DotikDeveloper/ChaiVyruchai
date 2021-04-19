<h1>Редактирование данных организации</h1>
<form action="/organizations" method="post">
        <input type="hidden" name="organization_id" value="<?php echo $data['organization_id']; ?>">
        <p><label for="org_name">Название организации<br>
        <input class="input" id="org_name" name="org_name"size="32"  type="text" value="<?php echo htmlspecialchars($data['name']); ?>"></label></p>
        <p><label for="org_address">Адрес организации<br>
        <input class="input" id="org_address" name="org_address"size="32"  type="text" value="<?php echo $data['address']; ?>"></label></p>
        <p><label for="org_mail">Email организации<br>
        <input class="input" id="org_mail" name="org_mail"size="32"  type="text" value="<?php echo $data['mail']; ?>"></label></p>
        <p><label for="org_phone">Телефон организации<br>
        <input class="input" id="org_phone" name="org_phone"size="32"  type="text" value="<?php echo $data['phone']; ?>"></label></p>

        <p class="submit"><input class="button" id="org_edit" name="org_edit" type="submit" value="Записать"></p>
</form>
