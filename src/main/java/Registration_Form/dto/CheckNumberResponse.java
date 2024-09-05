package Registration_Form.dto;

public class CheckNumberResponse {
    private boolean exists;

    public CheckNumberResponse(boolean exists) {
        this.exists = exists;
    }

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }
}

